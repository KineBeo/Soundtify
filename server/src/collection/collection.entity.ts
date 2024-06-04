
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Track } from "src/track/track.entity";

@Entity()
export class Collection {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public username: string;

    @Column()
    public totalTracks: number;

    @ManyToMany(() => Track, (track) => track.collections)
    @JoinTable()
    public tracks: Track[];

}