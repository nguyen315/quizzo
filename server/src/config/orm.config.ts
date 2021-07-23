import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions =>{
    console.log("user",process.env.MYSQL_USER)
    return {type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true}
  }
);
