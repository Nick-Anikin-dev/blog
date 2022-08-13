import { Column, CreatedAt, DataType, DeletedAt, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript'
import { Post } from "./post";

@Table({
    tableName: 'users'
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    first_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    last_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string

    @HasMany(() => Post)
    posts: Model<Post[]>

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

    @DeletedAt
    deletionDate: Date;
}
