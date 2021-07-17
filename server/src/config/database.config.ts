import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DatabaseConfig{
    constructor(private configService: ConfigService){}

    createTypeOrmOptions(){
        return this.configService.get('database');
    }
}