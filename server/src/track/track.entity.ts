import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Collection } from "src/collection/collection.entity";
@Entity()
export class Track {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public user_id: number; // This is a foreign key to the Artist table

    @Column({ nullable: true })
    public tags: string;

    @Column({ nullable: true })
    public moods: string;

    @Column({ nullable: true })
    public genres: string;

    @Column({ nullable: true })
    public movements: string;

    @Column({ nullable: true })
    public keywords: string;

    @Column({ nullable: true })
    public duration: number;

    @Column({ nullable: true })
    public trackName: string;

    @Column({ nullable: true })
    downloadUrl: string;

    @Column({ nullable: true })
    sourceUrl: string;

    @Column({ type: "jsonb", nullable: true })
    coverImage: any; // This is a JSON object

    @ManyToMany(() => Collection, (collection) => collection.tracks)
    public collections: Collection[];

}