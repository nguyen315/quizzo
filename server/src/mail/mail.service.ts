import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user, token: string) {
    // const url = `outlook.com/auth/confirm?token=${token}`;
    const url = `http://localhost:5000/`

    await this.mailerService.sendMail({
      to: user.email,
      from: 'quizzo_game@outlook.com',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.username,
        url,
      },
    });
  }
}