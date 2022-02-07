import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { NotProvidedError } from "../../../../core/presentation/errors/not-provided-error";
import { badRequest, ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { FindTaskByUidUseCase } from "../../domain/usecase/find-task-by-uid-usecase";

export class ListOneTaskController implements Controller{
    constructor(private usecase: FindTaskByUidUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const { taskKey } = req.params

            if(!taskKey){
                throw new NotProvidedError("TaskKey");
            }
            
            const result = await this.usecase.run({taskKey: taskKey});

            return ok(res, result);
        } catch(error) {
            return serverError(res, String(error));
        }
    }
}