import { Repository } from "typeorm";
import { ITask} from "../../domain/model/task";
import { DatabaseConnection } from "../../../../core/infra/database/connections/connection";
import { Task } from "../../../../core/infra/database/entities/Task";
import { NotFoundError } from "../../../../core/domain/errors/not-found-error";

export class TaskRepository {
    private readonly repository: Repository<Task>;

    constructor() {
        this.repository = DatabaseConnection.getConnection().manager.getRepository(Task);
    }

    async listAll() {
        return await this.repository.find({ relations: ['user']});
    }

    async listOne(task_uid: string) {
        const task = await this.repository.findOne(task_uid);
        
        if(!task){
            throw new NotFoundError("Task");
        }

        return task;
    }

    async listAllTasksByUser(userKey: string){
       return await this.repository.find({ where: { user: userKey} }); 
    }

    async create(task: ITask) {
        const taskEntity = this.repository.create(task);
        
        await this.repository.save(taskEntity);
        
        return taskEntity;
    }

    async update(taskKey: string, data: Partial<ITask>){
        const task = await this.repository.findOne(taskKey);

        if(!task){
            throw new NotFoundError("Task");
        }

        await this.repository.update(taskKey, {
            description: data.description ?? task.description,
            details: data.details ?? task.details,
            user: data.user ?? task.user
        });
    }

    async delete(task_uid: string){
        const task = await this.repository.findOne(task_uid);

        if(!task){
            throw new NotFoundError("Task");
        }

        await this.repository.delete(task_uid);
    }
}
