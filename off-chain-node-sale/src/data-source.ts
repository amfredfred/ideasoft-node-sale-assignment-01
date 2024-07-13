import "reflect-metadata"
import { DataSource } from "typeorm"
import { NodeOwner } from "./entities/NodeOwner";
import { NodeLicense } from "./entities/NodeLicense";
import { NodeFractionalLicense } from "./entities/NodeFractionalLicense";
import { NodeLicenseBatch } from "./entities/NodeLicenseBatch";
require('dotenv').config();

const database = process.env.POSTGRESQL_DB
const username = process.env.POSTGRESQL_USERNAME
const password = process.env.POSTGRESQL_PASSWORD
const port = Number(process.env.POSTGRES_PORT || 5432)

export const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port,
    username,
    password,
    database,
    // synchronize: true,
    logging: true,
    entities: [NodeOwner, NodeLicense, NodeFractionalLicense, NodeLicenseBatch],
    migrations: ['./migrations/*.ts'],
    subscribers: [],
    migrationsTableName: `${database}_migration_table`,
})
