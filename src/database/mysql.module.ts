import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DBInfo} from "../../DBInfo";
import {TypeOrmConfigService} from "./ormconfig.service";
import {BoardEntity} from "../api/board/board.Entity";
import {Chat} from "../api/chat/entity/chat";
import {ChatMember} from "../api/chat/entity/chat.member";
import {ChatContnet} from "../api/chat/entity/chat.contnet";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...DBInfo,
            synchronize:true,
            entities:[
                BoardEntity,
                Chat,
                ChatMember,
                ChatContnet
            ]
        })
    ]
})
export class MysqlModule {}
