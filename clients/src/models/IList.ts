import {ITasks} from "./ITasks";

export interface IList {
    id: number;
    name: string;
    createdAt: Date;
    updateAt: Date;
    tasks: ITasks[];
}

export class CreateList {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

export class UpdateList {
    id: number;
    name: string;
    constructor(id: number, name: string) {
        this.id =id;
        this.name = name;
    }
}