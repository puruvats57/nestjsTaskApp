import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { Team } from './teams/team.entity';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URI,
      // synchronize is convenient for dev; disable in production
      synchronize: true,
      logging: false,
      entities: [Task, Team]
    }),
    TasksModule,
    TeamsModule,
    AuthModule
  ]
})
export class AppModule {}
