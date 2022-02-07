import {BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import { ITask} from "../../../../features/task/domain/model/task";
import { v4 as uuid} from 'uuid';
import { User } from "./User";
import { IUser } from "../../../../features/user/domain/model/user";

@Entity({name: 'tasks'})
export class Task implements ITask {
    @PrimaryColumn({
        type: "uuid",
    })
    uid: string;
    
    @Column({
        length: 100,
        nullable: false
    })
    description: string;

    @Column({
        length: 200,
        nullable: false
    })
    details: string;

    @CreateDateColumn({
        nullable: false
    })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({name: 'user_uid'})
    user: IUser;


    @BeforeInsert()
    private beforeInsert(){
        console.log('before insert');
        this.uid = uuid();
    }

}
