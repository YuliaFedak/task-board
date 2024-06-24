import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    history: string;

    @CreateDateColumn()
    createdAt: Date;
}