import { registerAs } from "@nestjs/config";
import { ConfigKey } from "../common/enums/config.enum";


export default registerAs(ConfigKey.DB, () => ({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '3306'),
    username: process.env.DB_USERNAME || 'rental_user',
    password: process.env.DB_PASSWORD || 'TrAcquacePTYrouR',
    database: process.env.DB_NAME || 'rental_booking',
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOGGING === 'true',
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true'
}))