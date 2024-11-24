import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/httpd.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isTest } from './helper';

const env = process.env;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const options = {
          type: env.DB_TYPE,
          host: env.DB_HOST,
          port: Number(env.DB_PORT),
          username: env.DB_USER,
          password: env.DB_PASSWORD,
          database: env.DB_NAME,
          autoLoadEntities: true,
          synchronize: true,
        } as Writeable<TypeOrmModuleOptions>;

        if (isTest()) {
          options.dropSchema = true;
          options.synchronize = true;
          options.database = env.DB_TEST_NAME;
        }

        return options;
      },
    }),
    HttpModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
