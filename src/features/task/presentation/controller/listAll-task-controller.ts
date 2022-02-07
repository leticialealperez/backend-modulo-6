import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { ListAllTasksUseCase } from "../../domain/usecase/list-all-tasks-usecase";

export class ListAllTaskController implements Controller{
    constructor(private usecase: ListAllTasksUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const result = await this.usecase.run();

            return ok(res, result);
            
        } catch(error) {
            return serverError(res, String(error));
        }
    }
}