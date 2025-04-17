import { registerAs } from "@nestjs/config";
import { ConfigKey } from "../common/enums/config.enum";

export default registerAs(
    ConfigKey.APP, () => ({
        nodeEnv: process.env.NODE_ENV,
        port: parseInt(process.env.PORT ?? '3001', 10),
        apiPrefix: process.env.API_PREFIX || 'api',
        name: process.env.APP_NAME,
        isProduction: process.env.NODE_ENV == "production",
        frontendUrl: process.env.FRONTEND_URL,
    })
)