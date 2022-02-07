import { UseCase } from "../../../../core/domain/contracts/usecase";
import { CacheRepository } from "../../../../core/infra/repositories/cache-repository";
import { TaskRepository } from "../../infra/repositories/task-repository";


export class ListAllTasksUseCase implements UseCase {
    constructor(
        private repository: TaskRepository,
        private cacheRepository: CacheRepository
    ) {}

    async run() {
        const cachedTasks = await this.cacheRepository.get("task:all");
        if (cachedTasks) {
            return cachedTasks;
        }

        const result = await this.repository.listAll();

        await this.cacheRepository.set("task:all", result);

        return result;
    }
}
