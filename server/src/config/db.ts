import { Sequelize } from 'sequelize-typescript'
import { Post } from "../models/post";
import { User } from "../models/user";

export default new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    storage: ':memory:',
    models: [ Post, User ]
})
