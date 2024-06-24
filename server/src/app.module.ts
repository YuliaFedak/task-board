import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { ListModule } from './list/list.module';
import {List} from "./list/entities/list.entity";
import { TasksModule } from './tasks/tasks.module';
import {Tasks} from "./tasks/entities/tasks.entity";
import {History} from "./history/entities/history.entitity";
import {HistoryModule} from "./history/history.module";

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true}),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService : ConfigService) => ({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            synchronize: true,
            ssl: {
                rejectUnauthorized: false,
            },
            extra: {
                ssl: true,
            },
            entities: [List, Tasks, History],
        }),
          inject: [ConfigService],
      }),
      ListModule,
      TasksModule,
      HistoryModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
