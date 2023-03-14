import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BoardEntity} from "./board.Entity";

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
