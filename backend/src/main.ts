import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.enableCors({
    credentials: true,
    allowedHeaders: ["*", "content-type", "authorization"],
    origin: ["http://localhost:3000"]
  });

  app.use(json({ limit: "20mb" }))
  app.use(urlencoded({ limit: '20mb', extended: true }))

  app.use(cookieParser());


  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    transformOptions: { enableImplicitConversion: true },
    exceptionFactory: (errors) => {
      const constraintsObj = errors?.[0]?.constraints;
      if (constraintsObj) {
        let errorMsg = Object.values(constraintsObj)[0];
        throw new BadRequestException(errorMsg);
      }
    }
  }))




  const swaggerConfig = new DocumentBuilder().setTitle("Talker").setDescription("API(s) for Talker project").setVersion('1.0').build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(4000);
}
bootstrap();
