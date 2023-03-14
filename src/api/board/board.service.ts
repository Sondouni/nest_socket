import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {BoardEntity} from "./board.Entity";

@Injectable()
export class BoardService {
  constructor(
      @InjectRepository(BoardEntity) private boardRepository: Repository<BoardEntity>,
  ) {
    this.boardRepository = boardRepository;
  }
  getHello(): string {
    return 'This gonna be board list';
  }
  getBoardList(): any {
    return this.boardRepository.find();
  }
}
