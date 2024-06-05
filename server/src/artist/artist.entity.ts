import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {
    @PrimaryColumn()
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