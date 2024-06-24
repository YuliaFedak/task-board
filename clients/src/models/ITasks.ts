import {IList} from "./IList";

export interface ITasks {
    id: number;
    name: string;
    description: string;
    term: Date;
    priority: string;
    createdAt: Date;
    updatedAt: Date;
}

export class CreateTask {
    name: string;
    description: string;
    term: Date;
    priority: string;
    list: IList;
    constructor(name: string, description: string, term: Date, priority: string, list: IList) {
        this.name = name;
        this.description = description;
        this.term = term;
        this.priority = priority;
        this.list = list;
    }
}

export class UpdateTask {
    id: number;
    name: string;
    description: string;
    term: Date;
    priority: string;
    list: IList;
    constructor(id: number,name: string, description: string, term: Date, priority: string, list: IList) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.term = term;
        this.priority = priority;
        this.list = list;
    }
}