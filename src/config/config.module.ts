import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./app.config";
import dbConfig from "./db.config";
import authConfig from "./auth.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, dbConfig, authConfig] ,
            envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
        })
    ],
    exports: [ConfigModule],
})

export class CustomConfigModule {}