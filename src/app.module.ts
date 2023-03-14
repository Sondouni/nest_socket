import { Module } from '@nestjs/common';
import {MysqlModule} from "./database/mysql.module";
import {BoardModule} from "./api/board/board.module";

@Module({
  imports: [MysqlModule,BoardModule],
})
export class AppModule {}
