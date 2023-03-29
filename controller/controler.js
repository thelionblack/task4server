import { ApiError } from "../error/apiError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/models.js';
class UserController {
    async registration(req, res, next) {
        const { email, password, name } = req.body;
        if (!email || !password)
            return next(ApiError.badRequest('Некорректный email или password'));
        const condition = await User.findOne({ where: { email } });
        if (condition)
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, password: hashPassword, name });
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '24h' });
        await User.findAll({ raw: true })
            .then(table => res.json({ table, token, status: res.statusCode }));
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        console.log(1);
        const user = await User.findOne({ where: { email } });
        const table = await User.findAll({ raw: true });
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '24h' });
        return res.json({ table, token, status: res.statusCode, userEmail: user.email });
    }
    async tableUpdate(req, res) {
        try {
            const { status, id } = req.body;
            await User.update({ status: `${status}` }, { where: { id: `${id}` } });
            res.json({ status: 200 });
        }
        catch (error) {
            res.json({ status: 'error', error: 'Something went wrong with DataBase, try again' });
        }
    }
    async delete(req, res, next) {
        try {
            const { table, email } = req.body;
            let token;
            await table.map(async (elem, i) => {
                if (elem.isChecked) {
                    const user = await User.findOne({ where: { email: elem.email } });
                    user.destroy({ force: true });
                }
            });
            table.map((elem, i) => {
                if (elem.isChecked) {
                    if (email === elem.email) {
                        token = jwt.sign({ email: elem.email }, process.env.SECRET_KEY, { expiresIn: '24h' });
                    }
                    table.splice(i, 1);
                }
            });
            return res.json({ status: res.statusCode, table, token });
        }
        catch (error) {
            res.json({ status: error.status, error: error.message });
        }
    }
}
export default new UserController();
//# sourceMappingURL=controler.js.map