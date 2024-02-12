import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.enableCors({
    credentials: true,
    allowedHeaders: ["*", "content-type", "authorization"],
    origin: ["http://localhost:3000", "http://localhost:3002", "https://app.hospotribe.com"]
  });

  app.use(json({ limit: "20mb" }))
  app.use(urlencoded({ limit: '20mb', extended: true }))

  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder().setTitle("Talker").setDescription("API(s) for Talker project").setVersion('1.0').build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(4000);
}
bootstrap();
