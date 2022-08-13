import { Column, CreatedAt, DataType, DeletedAt, HasOne, Model, Table, UpdatedAt } from 'sequelize-typescript'
import { User } from "./user";

@Table({
    tableName: 'posts'
})
export class Post extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    postTitle: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    content: string


    @HasOne(() => User)

    @CreatedAt
    creationDate: Date

    @UpdatedAt
    updatedOn: Date

    @DeletedAt
    deletionDate: Date
}
