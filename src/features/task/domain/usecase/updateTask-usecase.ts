import { UseCase } from "../../../../core/domain/contracts/usecase";
import { NotFoundError } from "../../../../core/domain/errors/not-found-error";
import { UserRepository } from "../../../user/infra/repositories/user-repository";
import { TaskRepository } from "../../infra/repositories/task-repository";

export class UpdateTaskUseCase implements UseCase {
    constructor(
        private userRepository: UserRepository,
        private taskRepository: TaskRepository
    ) {}

    async run(data: any) {

        //valida se usuário existe
        const user = await this.userRepository.listOne(data.user);
        if(!user){
            throw new NotFoundError("User");
        }

        await this.taskRepository.update(data.uid, {
            description: data.description,
            details: data.details,
            user: user
        });
    }
}
