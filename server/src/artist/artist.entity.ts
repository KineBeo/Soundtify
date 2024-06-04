import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public displayname: string;

    @Column()
    public avatarUrl: string;

    @Column()
    public avatarColor: string;

    @Column()
    public gender: string;
}