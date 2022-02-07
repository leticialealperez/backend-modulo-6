import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { NotProvidedError } from "../../../../core/presentation/errors/not-provided-error";
import { ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { UpdateTaskUseCase } from "../../domain/usecase/updateTask-usecase";

export class UpdateTaskController implements Controller{
    constructor(private usecase: UpdateTaskUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const { description, details, userKey } = req.body;
            const { taskKey } = req.params

            if(!description){
                throw new NotProvidedError("Description");
            }

            if(!details){
                throw new NotProvidedError("Details");
            }

            if(!userKey){
                throw new NotProvidedError("Userkey");
            }

            await this.usecase.run({
                uid: taskKey,
                description: description, 
                details: details, 
                user: userKey
            });

            return ok(res);
            
        } catch(error) {
            return serverError(res, String(error));
        }
    }

}