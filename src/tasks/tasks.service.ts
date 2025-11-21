import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TeamsService } from '../teams/teams.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private repo: MongoRepository<Task>,
    private readonly teamsService: TeamsService
  ) {}

  async create(dto: CreateTaskDto) {
    const task = this.repo.create({
      description: dto.description,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      assigneeId: dto.assigneeId,
      assigneeName: dto.assigneeName,
      status: dto.status ?? TaskStatus.OPEN,
      metadata: dto.metadata ?? {}
    });
    return this.repo.save(task);
  }

  async findAllWithAssignee() {
    const tasks = await this.repo.find();
    // if assigneeId present, try to fetch member name from teams
    // naive approach: search all teams for member id
    // (for better performance keep a members collection)
    const teams = await this.teamsService.findAll();
    return tasks.map(t => {
      if (t.assigneeId) {
        for (const team of teams) {
          const mem = team.members.find(m => m.id === t.assigneeId);
          if (mem) {
            return { ...t, assignee: mem };
          }
        }
      }
      return { ...t, assignee: null };
    });
  }

  async findById(id: string) {
    const t = await this.repo.findOneBy({ _id: new ObjectId(id) });
    if (!t) throw new NotFoundException('Task not found');
    return t;
  }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.repo.findOneBy({ _id: new ObjectId(id) });
    if (!task) throw new NotFoundException('Task not found');

    if (dto.description !== undefined) task.description = dto.description;
    if (dto.dueDate !== undefined) task.dueDate = new Date(dto.dueDate);
    if (dto.assigneeId !== undefined) task.assigneeId = dto.assigneeId;
    if (dto.assigneeName !== undefined) task.assigneeName = dto.assigneeName;
    if (dto.status !== undefined) task.status = dto.status;
    if (dto.metadata !== undefined) task.metadata = dto.metadata;

    return this.repo.save(task);
  }

  async assignToTeamMember(taskId: string, teamId: string, memberId: string) {
    const team = await this.teamsService.findById(teamId);
    const member = team.members.find(m => m.id === memberId);
    if (!member) throw new NotFoundException('Member not found in team');

    const task = await this.repo.findOneBy({ _id: new ObjectId(taskId) });
    if (!task) throw new NotFoundException('Task not found');

    task.assigneeId = member.id;
    task.assigneeName = member.name;
    return this.repo.save(task);
  }
}
