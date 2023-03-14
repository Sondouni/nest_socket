import {Controller, Get, Param} from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly appService: BoardService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/list')
  getBoardList() {
    return this.appService.getBoardList();
  }

  @Get('/test')
  findAll(): Promise<any[]> {
    return new Promise((resolve) =>
        setTimeout(() => resolve([{userName:'이정주'},{userName: '김명일'}]), 2000)
    );
  }
  @Get(':test')
  getPathVariable(@Param('test') test) {
    console.log(test)
    return `${test}로 들어옴`;
  }

}
