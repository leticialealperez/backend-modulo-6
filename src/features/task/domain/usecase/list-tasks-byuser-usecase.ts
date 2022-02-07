import { UseCase } from "../../../../core/domain/contracts/usecase";
import { CacheRepository } from "../../../../core/infra/repositories/cache-repository";
import { TaskRepository } from "../../infra/repositories/task-repository";
import { ListAllTaskByUserParams } from "./models/list-all-tasks-byUser-params";

export class ListTasksByUserUseCase implements UseCase {
    constructor(
        private repository: TaskRepository,
        private cacheRepository: CacheRepository
    ) {}

    async run(data: ListAllTaskByUserParams) {
        try {
            const cachedTasks = await this.cacheRepository.get(`tasks-byUser:${data.userKey}`);
            if (cachedTasks) {
                return cachedTasks;
            }

            const result = await this.repository.listAllTasksByUser(data.userKey);

            await this.cacheRepository.set(`tasks-byUser:${data.userKey}`, result);

        } catch (error: any) {
            throw new Error(error.toString());
        }
    
    }
}