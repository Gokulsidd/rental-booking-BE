import { registerAs } from "@nestjs/config";
import { ConfigKey } from "../common/enums/config.enum";


export default registerAs(ConfigKey.DB, () => ({
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '3306'),
    username: process.env.DATABASE_USERNAME || 'rental_user',
    password: process.env.DATABASE_PASSWORD || 'TrAcquacePTYrouR',
    database: process.env.DATABASE_NAME || 'rental_booking',
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOGGING === 'true',
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true'
}))