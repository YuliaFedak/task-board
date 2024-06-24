import {Body, Controller, Param, Post, Get, Patch, Delete} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {UpdateTaskListIdDto} from "./dto/update-task-listId.dto";

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    create(@Body() createTasksDto: CreateTaskDto) {
        return this.tasksService.create(createTasksDto)
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.tasksService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateTasksDto: UpdateTaskDto
    ) {
        return this.tasksService.update(id, updateTasksDto)
    }

    @Patch('listId/:id')
    updateListId(
        @Param('id') id: number,
        @Body() updateTaskListId: UpdateTaskListIdDto
    ) {
        return this.tasksService.updateListId(id, updateTaskListId)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.tasksService.remove(id)
    }
}
