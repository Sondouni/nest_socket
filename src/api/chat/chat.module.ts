import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BoardEntity} from "../board/board.Entity";
import {ChatContnet} from "./entity/chat.contnet";
import {ChatMember} from "./entity/chat.member";
import {Chat} from "./entity/chat";

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatContnet, ChatMember])],
  providers: [ChatGateway],
})
export class ChatModule {}
