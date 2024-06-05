import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {
    @PrimaryColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public displayname: string;

    @Column({ type: "jsonb", nullable: true })
    avatar: any; // This is a JSON object

    @Column()
    public gender: string;
}