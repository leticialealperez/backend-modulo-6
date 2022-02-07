import express from 'express';
import { TaskRouter } from '../../features/task/presentation/routes/task-routes';
import { UserRouter } from '../../features/user/presentation/routes/user-routes';

export const makeRoutes = (app: express.Application) => {
    app.use('/user', UserRouter.getRoutes());
    app.use('/task', TaskRouter.getRoutes());
}