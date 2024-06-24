import {Body, Controller, Post, Get, Patch, Param, Delete} from '@nestjs/common';
import {ListService} from "./list.service";
import {CreateListDto} from "./dto/create-list.dto";
import {UpdateListDto} from "./dto/update-list.dto";

@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) {}

    @Post()
    create(@Body() createListDto: CreateListDto) {
        return this.listService.create(createListDto)
    }

    @Get()
    findAll() {
        return this.listService.findAll()
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateListDpo : UpdateListDto,
    ) {
        return this.listService.update(+id, updateListDpo)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.listService.remove(+id)
    }

}
