import { UseCase } from "../../../../core/domain/contracts/usecase";
import { UserRepository } from "../../../user/infra/repositories/user-repository";
import { DuplicatedProfileError } from "../errors/duplicated-profile-error";

export interface SignUpParams {
    login: string;
    password: string;
}

export class SignUpUseCase implements UseCase {
    constructor(
        private repository: UserRepository
    ) {}

    async run(data: SignUpParams) {

        //valida se usuário já existe (login)
        const users = await this.repository.listAll();
        let validatedUser = users.find(
            (users) => users.login == data.login
        );

        if(validatedUser){
            throw new DuplicatedProfileError();
        } 
        
        const result = await this.repository.create(data);

        return result;
    }
}
