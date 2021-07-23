import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const {
  MYSQL_HOST: HOST,
  MYSQL_USER: USER,
  MYSQL_PASSWORD: PASSWORD,
  MYSQL_DB: DB
} = process.env;

console.log(HOST, USER, PASSWORD);

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: HOST,
  port: 3306,
  username: USER,
  password: PASSWORD,
  database: DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true
};

export default config;
