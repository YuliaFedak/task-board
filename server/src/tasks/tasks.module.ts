import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tasks} from "./entities/tasks.entity";
import {History} from "../history/entities/history.entitity";
import {List} from "../list/entities/list.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Tasks]), TypeOrmModule.forFeature([History]), TypeOrmModule.forFeature([List])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
