import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../teams/team.entity';
import { TeamsModule } from '../teams/teams.module';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Team]), TeamsModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
