import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class ChatMember extends BaseEntity {
    @PrimaryGeneratedColumn()
    cm_cd: number

    @Column()
    chat_cd: number

    @Column()
    member_id: string


}
