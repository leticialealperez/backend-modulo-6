import {BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn} from "typeorm";
import { ITask } from "../../../../features/task/domain/model/task";
import { IUser } from "../../../../features/user/domain/model/user";
import { Task } from "./Task";
import { v4 as uuid} from 'uuid';

@Entity({name: 'users'})
export class User implements IUser {
    @PrimaryColumn({
        type: 'uuid'
    })
    uid: string;
    
    @Column({
        length: 30,
        nullable: false
    })
    login: string;
    
    @Column({
        length: 72,
        nullable: false,
        select: false
    })
    password: string;

    @OneToMany(() => Task, tasks => tasks.user)
    tasks?: Task[];

    @CreateDateColumn()
    created_at: Date;

    @BeforeInsert()
    private beforeInsert(){
        console.log('before insert');
        this.uid = uuid();
    }
}
