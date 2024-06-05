import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/uses.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationModule } from './authentication/authentication.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '60s'}
    }),
    AuthenticationModule,
    UsersModule,
    TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
