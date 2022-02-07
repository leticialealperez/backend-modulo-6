import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { NotProvidedError } from "../../../../core/presentation/errors/not-provided-error";
import { ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { UserRepository } from "../../infra/repositories/user-repository";

export class UpdateUserController implements Controller{
    constructor(private repository: UserRepository) {}

    async execute(req: Request, res: Response) {
        try {
            const { login, password } = req.body;
            const { userKey } = req.params

            if(!login){
                throw new NotProvidedError("Login");
            }

            if(!password){
                throw new NotProvidedError("Password");
            }

            await this.repository.update(userKey, {
                login, password
            });

            return ok(res);
            
        } catch(error) {
            return serverError(res, String(error));
        }
    }

}