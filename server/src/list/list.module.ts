import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {List} from "./entities/list.entity";
import { ListService } from './list.service';
import {History} from "../history/entities/history.entitity";
import {Tasks} from "../tasks/entities/tasks.entity";

@Module({
  imports: [TypeOrmModule.forFeature([List]), TypeOrmModule.forFeature([History]), TypeOrmModule.forFeature([Tasks])],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
