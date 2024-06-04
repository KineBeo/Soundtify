import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'typeorm';
import { User } from 'src/users/uses.entity';
import { Collection } from 'src/collection/collection.entity';
import { Track } from 'src/track/track.entity';
import { Liked } from 'src/liked/liked.entity';
import { Artist } from 'src/artist/artist.entity';
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                     User, 
                     Collection,
                     Track, 
                     Liked, 
                     Artist
                ],
                synchronize: true,
            }),
        }),
    ],
})
export class DatabaseModule implements OnModuleInit {
    constructor(private connection: Connection) { }

    onModuleInit() {
        this.connection.isConnected
            ? console.log('Database connected')
            : console.log('Database not connected');
    }
}