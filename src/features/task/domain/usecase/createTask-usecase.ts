import { UseCase } from "../../../../core/domain/contracts/usecase";
import { NotFoundError } from "../../../../core/domain/errors/not-found-error";
import { CacheRepository } from "../../../../core/infra/repositories/cache-repository";
import { UserRepository } from "../../../user/infra/repositories/user-repository";
import { TaskRepository } from "../../infra/repositories/task-repository";



export class CreateTaskUseCase implements UseCase {
    constructor(
        private userRepository: UserRepository,
        private taskRepository: TaskRepository,
        private cacheRepository: CacheRepository
    ) {}

    async run(data: any) {

        //valida se usuário existe
        const user = await this.userRepository.listOne(data.user);
        
        if(!user){
            throw new NotFoundError("User");
        }

        const newTask = {
            uid: data.uid,
            description: data.description,
            details: data.details,
            user: user,
        }

        // Create no BD relacional
        const taskCreated = await this.taskRepository.create(newTask);

        // Set no Redis
        await this.cacheRepository.set(
            `task:${taskCreated.uid}`,
            newTask
        );

        await this.cacheRepository.sadd(
            "tasksSet",
            `task:${taskCreated.uid}`
        );
    }
}
