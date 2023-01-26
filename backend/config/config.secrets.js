import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const secrets = {
    "MONGODB_CONNSTRING": process.env.MONGODB_CONNSTRING,
    "NODE_ENV": process.env.NODE_ENV,
    "PORT": process.env.BACKEND_SERVICE_PORT,
}