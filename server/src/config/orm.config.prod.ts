import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.MYSQL_HOST_PROD,
    port: Number(process.env.DB_PORT_PROD),
    username: process.env.MYSQL_USER_PROD,
    password: process.env.MYSQL_PASSWORD_PROD,
    database: process.env.MYSQL_DB_PROD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true
  })
);
