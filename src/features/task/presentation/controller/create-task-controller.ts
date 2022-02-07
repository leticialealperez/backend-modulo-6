import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { badRequest, ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { v4 as uuid} from 'uuid'
import { CreateTaskUseCase } from "../../domain/usecase/createTask-usecase";
import { NotProvidedError } from "../../../../core/presentation/errors/not-provided-error";

export class CreateTaskController implements Controller{
    constructor(private usecase: CreateTaskUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const { description, details, userKey } = req.body;

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
                uid: uuid(), 
                description: description,
                details: details,
                user: userKey,
            });
         
            return ok(res, "Task was successfully created");
            
        } catch(error) {
            return serverError(res, String(error));
        }
    }

}