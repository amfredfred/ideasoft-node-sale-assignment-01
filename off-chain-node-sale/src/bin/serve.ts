import app from "../app";
import { dataSource } from "../data-source";
import http from 'http'
import { Client } from 'pg';

require('dotenv').config();
var server = http.createServer(app);
const PORT = process.env.EXPRESS_SERVE_PORT || 8080

const createDatabase = async () => {

    const database = process.env.POSTGRESQL_DB
    const username = process.env.POSTGRESQL_USERNAME
    const password = process.env.POSTGRESQL_PASSWORD
    const postgres_port = process.env.POSTGRES_PORT || 5432

    const client = new Client({
        user: username,
        host: 'localhost',
        password: password,
        port: postgres_port,
    });

    try {
        await client.connect();
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [database]);
        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE ${database}`);
            console.log('Database created successfully!');
        } else console.log('Database already exists.');
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
};

async function beginServing() {
    await createDatabase();
    await dataSource.initialize()
    server.listen(PORT);
    server.on('error', console.log);
    server.on('listening', () => console.log(`Serving Express On Port: ${PORT}`));
    return "All Good"
}

beginServing().then(console.log).catch(console.error);