import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { CaslModule } from './casl/casl.module';
import { StreamModule } from './stream/stream.module';
import { EpisodeModule } from './episode/episode.module';
import { SeasonModule } from './season/season.module';
import { SeriesModule } from './series/series.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/IPTV_DB'),
    UserModule,
    AuthModule,
    CaslModule,
    StreamModule,
    EpisodeModule,
    SeasonModule,
    SeriesModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
