import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateListDto} from "./dto/create-list.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {List} from "./entities/list.entity";
import {Repository} from "typeorm";
import {UpdateListDto} from "./dto/update-list.dto";
import {History} from "../history/entities/history.entitity";
import {Tasks} from "../tasks/entities/tasks.entity";

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(List)
        private readonly listRepository : Repository<List>,
        @InjectRepository(History)
        private readonly historyRepository: Repository<History>,
        @InjectRepository(Tasks)
        private  readonly tasksRepository : Repository<Tasks>
    ) {}
    async create(createListDto :CreateListDto) {
        const existList = await this.listRepository.findOne({
            where: {
                name : createListDto.name,
            },
        })
        if(existList) throw new  BadRequestException("This list already exists")

        const list = await this.listRepository.save({
            name: createListDto.name
        })

        const history = await this.historyRepository.save({
            history: `A new "${createListDto.name}" list has been created`
        })


        return {list, history}
    }

    async findAll () {
        const lists = await this.listRepository.find({
            relations: ['tasks'],
        })
        return lists
    }

    async update(id: number, updateListDto: UpdateListDto) {
        const list = await this.listRepository.findOne({
            where: {id},
        })
        if(!list) throw new NotFoundException("List not found")
        const listUpdate = this.listRepository.update(id, updateListDto)

        const history = await this.historyRepository.save({
            history: `The "${list.name}" list has been changed to "${updateListDto.name}"`
        })
        return {listUpdate, history}
    }

    async remove(id: number) {
        const list = await this.listRepository.findOne({
            where: {id},
        })
        if(!list) throw new NotFoundException("List not found")
        await this.tasksRepository.delete({ list: { id } });
        const listDelete = this.listRepository.delete(id)
        const history = await this.historyRepository.save({
            history: `The "${list.name}" list has been deleted`
        })
        return {listDelete, history}
    }
}
