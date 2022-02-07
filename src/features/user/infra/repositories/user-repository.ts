import { Repository } from "typeorm";
import { IUser } from "../../domain/model/user";
import { DatabaseConnection } from "../../../../core/infra/database/connections/connection";
import { User } from "../../../../core/infra/database/entities/User";
import { v4 as uuid} from 'uuid';

export class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = DatabaseConnection.getConnection().manager.getRepository(User);
    }

    async create(data: Partial<IUser>) {
        const userEntity = this.repository.create({
            uid: uuid(),
            login: data.login,
            password: data.password
        });

        return await this.repository.save(userEntity);
    }

    async listAll() {
        return await this.repository.find({
            order: {
                created_at: "DESC"
            }
        });
    }

    async listOne(userKey: string) {
        const user = await this.repository.findOne(userKey);
        
        if(!user){
            throw new Error('User does not exists');
        }

        return user;
    }

    async update(userKey: string, data: Partial<IUser>){
        const user = await this.repository.findOne(userKey);

        if(!user){
            throw new Error('User does not exists');
        }

        await this.repository.update(userKey, {
            login: data.login ?? user.login,
            password: data.password ?? user.password
        });

    }

    async delete(userKey: string){
        const user = await this.repository.findOne(userKey);

        if(!user){
            throw new Error('User does not exists');
        }

        await this.repository.delete(userKey);

    }
}
