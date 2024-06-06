import {Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, } from "typeorm";
import { Collection } from "src/collection/collection.entity";
@Entity()
export class Track {
    @PrimaryColumn()
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

    @Column({type: 'decimal', nullable: true })
    public duration: number;

    @Column({ nullable: true })
    public track_name: string;

    @Column({ nullable: true })
    public download_url: string;

    @Column({ nullable: true })
    public src: string;

    @Column({ type: "jsonb", nullable: true })
    cover_image: any; // This is a JSON object

    @ManyToMany(() => Collection, (collection) => collection.tracks)
    public collections: Collection[];

}