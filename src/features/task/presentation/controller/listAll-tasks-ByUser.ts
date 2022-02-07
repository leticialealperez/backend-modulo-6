import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { NotProvidedError } from "../../../../core/presentation/errors/not-provided-error";
import { ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { ListTasksByUserUseCase } from "../../domain/usecase/list-tasks-byuser-usecase";


export class ListAllTaskByUserController implements Controller{
    constructor(private usecase: ListTasksByUserUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const { userKey } = req.params
            
            if (!userKey) {
                throw new NotProvidedError("UserKey");
            }

            const result = await this.usecase.run({userKey: userKey});

            return ok(res, result);
        } catch(error) {
            return serverError(res, String(error));
        }
    }
}