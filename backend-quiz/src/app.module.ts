import { OptionsService } from './questions/options.service';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [OptionsService, AppService],
})
export class AppModule {}
