import { Module } from '@nestjs/common';
import {MysqlModule} from "./database/mysql.module";
import {BoardModule} from "./api/board/board.module";
import {ChatModule} from "./api/chat/chat.module";

@Module({
  imports: [MysqlModule,BoardModule,ChatModule],
})
export class AppModule {}
