import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { NotProvidedError } from "../../../../core/presentation/errors/not-provided-error";
import { badRequest, ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { SignUpUseCase } from "../../domain/usecase/signup-usecase";

export class CreateUserController implements Controller{
    constructor(private usecase: SignUpUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const { login, password } = req.body;

            if(!login){
                throw new NotProvidedError("Login");
            }

            if(!password){
                throw new NotProvidedError("Password");
            }

            
            const newUser = await this.usecase.run({
                login: login,
                password: password
            });
            
            return ok(res, newUser);
            
        } catch(error) {
            return serverError(res, String(error));
        }
    }

}