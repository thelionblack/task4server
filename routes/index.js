import express from 'express';
import userController from '../controller/controler.js';
export const router = express.Router();
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.put('/auth/update', userController.tableUpdate);
router.delete('/auth/delete', userController.delete);
//# sourceMappingURL=index.js.map