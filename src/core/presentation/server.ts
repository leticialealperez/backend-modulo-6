import express, { Request, Response } from 'express';
import cors from 'cors';
import { makeRoutes } from './routes';

const port = process.env.PORT || 3000

export const initServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    
    app.get('/', (req: Request, res: Response) =>{
        res.status(200).send('API APLICATION -> OK');
    })
    
    makeRoutes(app);
    
    await app.listen(port, () => console.log(`Server is running on PORT ${port}`));
}