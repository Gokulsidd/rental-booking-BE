import { registerAs } from "@nestjs/config";
import { ConfigKey } from "../common/enums/config.enum";

export default registerAs(
    ConfigKey.AUTH, () => ({
        saltRounds: (process.env.BCRYPT_SALT_ROUNDS || '10'),
        jwtSecret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    })
)