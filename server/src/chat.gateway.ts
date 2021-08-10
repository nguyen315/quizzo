import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QuestionService } from './Question/question.service';
import { RoomService } from './Room/room.service';

let players = {};
let rooms = {};

@WebSocketGateway({ path: '/api/socket' })
export class ChatGateway implements OnGatewayDisconnect {
  constructor(
    private roomService: RoomService,
    private questionService: QuestionService
  ) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    // check if host disconnect, then remove the room

    for (let roomId in rooms) {
      if (rooms[roomId].hostId === client.id) {
        // disconnect all players and host from socket
        this.server.in(roomId.toString()).emit('leave');

        this.endGame(roomId.toString());
        break;
      }
    }
  }

  @SubscribeMessage('host-create-room')
  async handleCreateRoom(@MessageBody() data, @ConnectedSocket() client) {
    players[data.roomId] = [];
    rooms[data.roomId] = await this.roomService.findByPinCode(data.roomId);
    rooms[data.roomId].count = 0;
    rooms[data.roomId].hostId = client.id;

    client.emit('created-room', {
      roomId: data.roomId,
      id: client.id,
      role: 'host',
      questionsLength: rooms[data.roomId].questions.length
    });

    client.join(data.roomId.toString());
  }

  @SubscribeMessage('player-join-room')
  handleJoinRoom(@MessageBody() data, @ConnectedSocket() client): void {
    // find room
    // Look up the room ID in the Socket.IO manager object.
    let room = this.server.sockets.adapter.rooms.get(data.roomId);
    // If the room exists...
    if (room != undefined) {
      client.join(data.roomId.toString());
      client.emit('player-joined', data);
    } else {
      // Otherwise, send an error message back to the player.
      client.emit('error', { message: 'This room does not exist.' });
    }
  }

  @SubscribeMessage('player-enter-name')
  handlePlayerEnterName(@MessageBody() data, @ConnectedSocket() client): void {
    const player = { ...data };
    player.id = client.id;
    data.id = client.id;
    player.point = 0;
    player.isCorrect = false;
    player.count = 0;
    players[data.roomId].push(player);
    this.server
      .in(data.roomId.toString())
      .emit('player-join-room', players[data.roomId]);
    client.emit('player-joined-with-name', data);
  }

  @SubscribeMessage('host-start-question')
  handleHostPlayRoom(@MessageBody() data, @ConnectedSocket() client): void {
    // if room have no questions, then end game
    if (rooms[data.roomId].questions.length <= 0) {
      this.server.in(data.roomId.toString()).emit('game-ended');
      this.endGame(data.roomId.toString());
    } else {
      const timeStamp = new Date();

      rooms[data.roomId].timeStamp = timeStamp;

      const index = rooms[data.roomId].count;

      const questionToHost = rooms[data.roomId].questions[index];

      // extract answer
      const { answers, ...questionToPlayer } =
        rooms[data.roomId].questions[index];
      // extract isCorrect in answer then append to question
      questionToPlayer.answers = answers.map((answer) => {
        const { isCorrect, ...rest } = answer;
        return rest;
      });

      client.emit('next-question', {
        question: questionToHost,
        timeStamp: timeStamp,
        count: rooms[data.roomId].count
      });
      client.broadcast.in(data.roomId.toString()).emit('next-question', {
        question: questionToPlayer,
        timeStamp: timeStamp
      });
      rooms[data.roomId].count++;
    }
  }

  @SubscribeMessage('player-submit')
  async handlePlayerSubmit(@MessageBody() data, @ConnectedSocket() client) {
    // calculate the answering time of the player.
    const questionStartTime = new Date(rooms[data.roomId].timeStamp);
    const answerTime = new Date(data.timeStamp);
    const thinkingTime = answerTime.getTime() - questionStartTime.getTime();
    // check if the player choose the right answer.
    const questionDetais = await this.questionService.findOne(data.questionId);
    const correctAnswer = questionDetais.answers.find(
      (i) => i.isCorrect === true
    ).id;
    const coeff = Number(data.answerId) === correctAnswer ? 1 : 0;

    let point = coeff * (rooms[data.roomId].timeUp * 1000 - thinkingTime);
    point = point < 0 ? 0 : point;
    // add point of the questions to total score of the player
    const currentPlayer = players[data.roomId].find((i) => i.id === client.id);
    currentPlayer.point += point;

    // if player is correct, then change isCorrect to true, else false
    if (coeff === 1) {
      currentPlayer.isCorrect = true;
    } else {
      currentPlayer.isCorrect = false;
    }

    currentPlayer.count = rooms[data.roomId].count;
  }

  @SubscribeMessage('host-end-question')
  handleHostEndQuestion(@MessageBody() data, @ConnectedSocket() client): void {
    const index = rooms[data.roomId].count;

    // check if player not submit answer, then assign false to property isCorrect of answer
    players[data.roomId].forEach((player) => {
      if (player.count != rooms[data.roomId].count) player.isCorrect = false;
    });

    this.server
      .in(data.roomId.toString())
      .emit('question-ended', players[data.roomId]);
  }

  @SubscribeMessage('host-end-game')
  handleHostEndGame(@MessageBody() data): void {
    this.server.in(data.roomId.toString()).emit('game-ended');

    this.endGame(data.roomId.toString());
  }

  private endGame = (roomId: string) => {
    const clients = this.server.sockets.adapter.rooms.get(roomId);

    // if a room have only one clients is host, clients will return undefined
    if (clients)
      clients.forEach((clientId) => {
        this.server.sockets.sockets.get(clientId).leave(roomId);
      });

    // delete room & player
    delete rooms[roomId];
    delete players[roomId];
  };
}
