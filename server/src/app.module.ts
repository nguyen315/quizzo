import { RoomModule } from './Room/room.module';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './User/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { QuestionModule } from './Question/question.module';
import { TagQuestionModule } from './tag-question/tag-question.module';
import { AnswerModule } from './answer/answer.module';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    RoomModule,
    AuthModule,
    UserModule,

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [ormConfig, ormConfigProd],
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd
    }),
    QuestionModule,
    TagQuestionModule,
    AnswerModule
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway]
})
export class AppModule {}
