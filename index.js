import express from 'express';
import sequelize from './db/db.js';
import cors from 'cors';
import { router } from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';
const PORT = process.env.SERVER_PORT || 2133;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
};
start();
console.log();
//# sourceMappingURL=index.js.map