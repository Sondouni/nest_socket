import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DBInfo} from "../../DBInfo";
import {TypeOrmConfigService} from "./ormconfig.service";
import {BoardEntity} from "../api/board/board.Entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...DBInfo,
            entities:[
                BoardEntity
            ]
        })
    ]
})
export class MysqlModule {}
