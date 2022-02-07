import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { TaskRepository } from "../../infra/repositories/task-repository";

export class DeleteTaskController implements Controller{
    constructor(private repository: TaskRepository) {}

    async execute(req: Request, res: Response) {
        try {
            const { taskKey } = req.params

            await this.repository.delete(taskKey);

            return ok(res);
            
        } catch(error) {
            return serverError(res, String(error));
        }
    }
}