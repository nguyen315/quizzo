import { AuthModule } from "./Auth/auth.module";
import { UserModule } from "./User/user.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import config from "./ormconfig";

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
