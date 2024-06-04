import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Liked {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public trackId: number;

    @Column()
    public username: string;
}