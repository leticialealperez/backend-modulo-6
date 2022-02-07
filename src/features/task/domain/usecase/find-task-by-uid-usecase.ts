import { UseCase } from "../../../../core/domain/contracts/usecase";
import { NotFoundError } from "../../../../core/domain/errors/not-found-error";
import { CacheRepository } from "../../../../core/infra/repositories/cache-repository";
import { TaskRepository } from "../../infra/repositories/task-repository";
import { ITask } from "../model/task";
import { ListTaskByUidParams } from "./models/list-task-byUid-params";

export class FindTaskByUidUseCase implements UseCase {
    constructor(
        private repository: TaskRepository,
        private cacheRepository: CacheRepository
    ) {}

    async run(data: ListTaskByUidParams) {
        try {
            const cachedTask = await this.cacheRepository.get(
                `task:${data.taskKey}`
            );
            if (cachedTask) {
                return {
                    ...cachedTask,
                    cache: true,
                };
            }

            let task: ITask | undefined = await this.repository.listOne(
                data.taskKey
            );

            if (!task) throw new NotFoundError("Task");

            return task;
        } catch (error: any) {
            throw new Error(error.toString());
        }
    }
}
