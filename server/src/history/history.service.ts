import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {History} from "./entities/history.entitity";
import {Repository} from "typeorm";

@Injectable()
export class HistoryService {

    constructor(
        @InjectRepository(History)
        private readonly historyRepository: Repository<History>
    ) {}

    async findAll() {
        const history = this.historyRepository.find({
            order: {
                id: 'DESC'
            }
        })
        return history
    }


}
