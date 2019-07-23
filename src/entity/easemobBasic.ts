import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { baseEntity } from "./baseEntity";

@Entity()
export class easemobBasic extends baseEntity {

    @PrimaryGeneratedColumn({ comment: "主键" })
    id: number;

    @Column({ comment: "dappId" })
    dappId: number;

    @Column({ comment: "userId" })
    userId: number;

    @Column({ comment: "账号" })
    username: string;

    @Column({ comment: "密码" })
    password: string;

    @Column({ comment: "昵称" })
    nickname: string;

    @Column({ comment: "头像", nullable: true })
    avatar: string;
    @Column({ comment: "生日", nullable: true })
    birthday: Date;
    @Column({ comment: "签名", nullable: true })
    signature: string;
    @Column({ comment: "性别", nullable: true })
    gender: number;
    @Column({ comment: "地区", nullable: true })
    region: string;
    @Column({ comment: "地址", nullable: true })
    address: string;
    @Column({ comment: "额外信息", nullable: true, "type": "json" })
    extras: JSON;

}

