import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Tasks} from "./entities/tasks.entity";
import {Repository} from "typeorm";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {UpdateTaskListIdDto} from "./dto/update-task-listId.dto";
import {History} from "../history/entities/history.entitity";
import {List} from "../list/entities/list.entity";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks)
        private readonly tasksRepository: Repository<Tasks>,

        @InjectRepository(History)
        private readonly historyRepository: Repository<History>,

        @InjectRepository(List)
        private readonly listRepository: Repository<List>

    ) {}
    async create(createTaskDto: CreateTaskDto) {
        const task = {
            name: createTaskDto.name,
            description: createTaskDto.description,
            term: createTaskDto.term,
            priority: createTaskDto.priority,
            list: createTaskDto.list,
        }

        const taskCreate = await this.tasksRepository.save(task)

        const history = await this.historyRepository.save({
            history: `A new "${taskCreate.name}" task has been created`
        })
        return {taskCreate, history}
    }

    async findOne(id: number) {
        return this.tasksRepository.findOne({
            where: {id}
        })
    }

    async update(id: number, updateTasksDto: UpdateTaskDto){
        const isExistTask = await this.tasksRepository.findOne({
            where: {id},
        })

        if(!isExistTask) throw new NotFoundException("This task not exists")

        const taskUpdate = this.tasksRepository.update(id, updateTasksDto)

        const history = this.historyRepository.save({
            history: `The "${isExistTask.name}" task has been updated`
        })
        return {taskUpdate, history}
    }

    async updateListId(id: number, updateTaskListIdDto: UpdateTaskListIdDto) {
        const isExistTask = await this.tasksRepository.findOne({
            where: {id},
        })

        if(!isExistTask) throw new NotFoundException("This task not exists")

        const taskMoved = await this.tasksRepository.update(id, { list: { id: updateTaskListIdDto.listId } })

        const findList = await this.listRepository.findOne({
            where: {id: updateTaskListIdDto.listId}
        })

        if (!findList) {
            throw new NotFoundException(`List with id ${updateTaskListIdDto.listId} not found`);
        }

        const history = await  this.historyRepository.save({
            history: `The "${isExistTask.name}" task has been moved to ${findList.name} list`,
        })
        return {taskMoved, history}
    }

    async remove(id: number) {
        const isExistTask = await this.tasksRepository.findOne({
            where: {id}
        })

        if(!isExistTask) throw new NotFoundException("Task is not found")

        const taskDelete = this.tasksRepository.delete(id)

        const history = this.historyRepository.save({
            history: `The "${isExistTask.name}" task has been deleted`
        })
        return {taskDelete, history}
    }
}
