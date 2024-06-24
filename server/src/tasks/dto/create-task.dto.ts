import {List} from "../../list/entities/list.entity";

export class CreateTaskDto {
    name: string;
    description: string;
    term: Date;
    priority: string;
    list: List;
}