import { Request, Response, Router } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache-repository";
import { UserRepository } from "../../../user/infra/repositories/user-repository";
import { CreateTaskUseCase } from "../../domain/usecase/createTask-usecase";
import { FindTaskByUidUseCase } from "../../domain/usecase/find-task-by-uid-usecase";
import { ListAllTasksUseCase } from "../../domain/usecase/list-all-tasks-usecase";
import { ListTasksByUserUseCase } from "../../domain/usecase/list-tasks-byuser-usecase";
import { UpdateTaskUseCase } from "../../domain/usecase/updateTask-usecase";
import { TaskRepository } from "../../infra/repositories/task-repository";
import { CreateTaskController } from "../controller/create-task-controller";
import { DeleteTaskController } from "../controller/delete-task-controller";
import { ListAllTaskController } from "../controller/listAll-task-controller";
import { ListAllTaskByUserController } from "../controller/listAll-tasks-ByUser";
import { ListOneTaskController } from "../controller/listOne-task-controller";
import { UpdateTaskController } from "../controller/update-task-controller";

export class TaskRouter {
    static getRoutes() {
        const routes = Router();
        
        const taskRepo = new TaskRepository();
        const userRepo = new UserRepository();
        const cacheRepository = new CacheRepository();

        const createTaskUseCase = new CreateTaskUseCase(userRepo, taskRepo, cacheRepository);
        const findTaskByUidUseCase = new FindTaskByUidUseCase(taskRepo, cacheRepository);
        const listAllTasksUseCase = new ListAllTasksUseCase(taskRepo, cacheRepository);
        const updateTaskUseCase = new UpdateTaskUseCase(userRepo, taskRepo);
        const listTasksByUserUseCase = new ListTasksByUserUseCase(taskRepo, cacheRepository);

        const createTaskController = new CreateTaskController(createTaskUseCase);
        const listOneTaskController = new ListOneTaskController(findTaskByUidUseCase);
        const listAllTaskController = new ListAllTaskController(listAllTasksUseCase);
        const updateTaskController = new UpdateTaskController(updateTaskUseCase);
        const listAllTasksByUser = new ListAllTaskByUserController(listTasksByUserUseCase);
        const deleteTaskController = new DeleteTaskController(taskRepo);

        routes.post('/', (req: Request, res: Response) => createTaskController.execute(req, res));
        routes.get('/', (req: Request, res: Response) => listAllTaskController.execute(req, res));
        routes.get('/user/:userKey', (req: Request, res: Response) => listAllTasksByUser.execute(req, res));
        routes.get('/:taskKey', (req: Request, res: Response) => listOneTaskController.execute(req, res));
        routes.put('/:taskKey', (req: Request, res: Response) => updateTaskController.execute(req, res));
        routes.delete('/:taskKey', (req: Request, res: Response) => deleteTaskController.execute(req, res));

        return routes;
    }
}
