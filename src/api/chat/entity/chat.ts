import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    chat_cd: number

    @Column()
    chat_name: string

    @Column("datetime", {
        name: "reg_dt",
        default: () => "CURRENT_TIMESTAMP",
    })
    reg_dt: Date

    @Column("varchar",{
        default:"N",
    })
    del_fg: string




    // static findByName(firstName: string, lastName: string) {
    //     return this.createQueryBuilder("user")
    //         .where("user.firstName = :firstName", { firstName })
    //         .andWhere("user.lastName = :lastName", { lastName })
    //         .getMany()
    // }
}
