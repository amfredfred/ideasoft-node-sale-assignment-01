import app from "../app";
import { dataSource } from "../data-source";
import http from 'http'

var server = http.createServer(app);
const PORT = process.env.EXPRESS_SERVE_PORT || 8080

async function beginServing() {
    await dataSource.initialize()
    server.listen(PORT);
    server.on('error', console.log);
    server.on('listening', () => console.log(`Serving Express On Port: ${PORT}`));
    return "All Good"
}

beginServing().then(console.log).catch(console.error);