import "reflect-metadata"
import { DataSource } from "typeorm"

const database = process.env.POSTGRESQL_DB
const username = process.env.POSTGRESQL_USERNAME
const password = process.env.POSTGRESQL_PASSWORD

export const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username,
    password,
    database,
    synchronize: true,
    logging: false,
    entities: ['./entity/**.ts'],
    migrations: ['./migration/**.ts'],
    subscribers: [],
})
