import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "#/core/app.module";
import { env } from "#/core/env";
import { AppExceptionFilter } from "#/filters/global-exception.filter";

env();

const app = await NestFactory.create(AppModule);
app.useGlobalFilters(new AppExceptionFilter());

await app.listen(env("port"), () => {
  Logger.log(`Listening on port ${env("port")}`, "DEBUG");
});
