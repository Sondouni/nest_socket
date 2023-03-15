import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class ChatContnet extends BaseEntity {
    @PrimaryGeneratedColumn()
    cc_cd: number

    @Column()
    chat_cd: number

    @Column()
    content: string

    @Column()
    member_id: string

    @Column("datetime", {
        name: "reg_dt",
        default: () => "CURRENT_TIMESTAMP",
    })
    reg_dt: Date

    @Column("varchar",{
        default: "N",
    })
    del_fg: string


}
