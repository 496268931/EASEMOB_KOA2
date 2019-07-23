import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity()
export class baseEntity {

    @PrimaryGeneratedColumn({ comment: "主键" })
    id: number;

    /** 创建时间 */
    @CreateDateColumn()
    sys_created_at: Date

    /** 更新时间 */
    @UpdateDateColumn()
    sys_updated_at: Date

}
