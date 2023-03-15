import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket, MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit, SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import {Namespace, Socket} from 'socket.io';
import {InjectRepository} from "@nestjs/typeorm";
import {BoardEntity} from "../board/board.Entity";
import {Repository} from "typeorm";
import {Chat} from "./entity/chat";
import {ChatMember} from "./entity/chat.member";
import {ChatContnet} from "./entity/chat.contnet";

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: ['http://localhost:8081'],
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() nsp: Namespace;

  constructor(
      @InjectRepository(Chat) private chatRepository: Repository<Chat>,
      @InjectRepository(ChatMember) private chatMemberRepository: Repository<ChatMember>,
      @InjectRepository(ChatContnet) private chatContentRepository: Repository<ChatContnet>,
  ) {
    this.chatRepository = chatRepository;
    this.chatMemberRepository = chatMemberRepository;
    this.chatContentRepository = chatContentRepository;
  }

  // 초기화 이후에 실행
  afterInit() {
    this.nsp.adapter.on('create-room', (room) => {
      console.log(`"Room:${room}"이 생성되었습니다.`);
    });

    this.nsp.adapter.on('join-room', (room, id) => {
      console.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
    });

    this.nsp.adapter.on('leave-room', (room, id) => {
      console.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
    });

    this.nsp.adapter.on('delete-room', (roomName) => {
      console.log(`"Room:${roomName}"이 삭제되었습니다.`);
    });
    console.log('웹소켓 서버 초기화 ✅');
  }

  // 소켓이 연결되면 실행
  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id} 소켓 연결`);
  }

  // 소켓 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id} 소켓 연결 해제`);
  }

  @SubscribeMessage('message')
  async handleMessage(
      @ConnectedSocket() socket: Socket,
      @MessageBody() messageObj: any,
  ) {
    console.log(messageObj,'messageObj');
    console.log(socket.id,'Socket');
    const cmResult = await this.chatContentRepository.save({
      member_id:messageObj.memberId,
      chat_cd:messageObj.chat_cd,
      content:messageObj.message
    });

    socket.broadcast
        .to(messageObj.chat_cd)
        .emit('message', { username: messageObj.member_id, message:messageObj.message });

    return { username: socket.id, messageObj };
  }

  @SubscribeMessage('room-list')
  async handleRoomList() {
    const result = await this.chatRepository.find();
    console.log(result,'채팅방 리스트')
    return result;
  }

  @SubscribeMessage('room-create')
  async handleRoomCreate(
      @ConnectedSocket() socket: Socket,
      @MessageBody() message: any,
  ) {
    const chatResult = await this.chatRepository.save({
      chat_name:message.chatName,
    });
    console.log(chatResult,'chatResult');
    const cmResult = await this.chatMemberRepository.save({
      member_id:message.memberId,
      chat_cd:chatResult.chat_cd
    });
    const chatList = await this.chatRepository.find();
    socket.broadcast.emit('room-list', chatList);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
      @ConnectedSocket() socket: Socket,
      @MessageBody() messageObj: any,
  ) {
    socket.join(messageObj.chat_cd+''); // join room
    socket.broadcast
        .to(messageObj.chat_cd+'')
        .emit('message', { message: `${messageObj.member_id}가 들어왔습니다.` });


    return { success: true };
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(
      @ConnectedSocket() socket: Socket,
      @MessageBody() messageObj: any,
  ) {
    socket.leave(messageObj.roomName); // leave room
    socket.broadcast
        .to(messageObj.roomName)
        .emit('message', { message: `${messageObj.member_id}가 나갔습니다.` });


    return { success: true };
  }

  @SubscribeMessage('chat-content')
  async handleChatContent(
      @ConnectedSocket() socket: Socket,
      @MessageBody() messageObj: any,
  ) {
    const result = await this.chatContentRepository
        .createQueryBuilder()
        .select('ChatContent')
        .from(ChatContnet, 'ChatContent')
        .where('ChatContent.chat_cd = :chat_cd', {chat_cd: messageObj.chat_cd})
        .orderBy("ChatContent.reg_dt",'ASC')
        .getMany();


    return { list: result };
  }
}
