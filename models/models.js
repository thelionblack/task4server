import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';
export const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    createdAt: { type: DataTypes.STRING, defaultValue: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` },
    updatedAt: { type: DataTypes.STRING, defaultValue: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` },
    status: { type: DataTypes.STRING, defaultValue: 'unBlock' },
    isChecked: { type: DataTypes.BOOLEAN, defaultValue: false },
});
//# sourceMappingURL=models.js.map