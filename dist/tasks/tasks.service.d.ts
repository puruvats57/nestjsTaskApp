import { MongoRepository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TeamsService } from '../teams/teams.service';
export declare class TasksService {
    private repo;
    private readonly teamsService;
    constructor(repo: MongoRepository<Task>, teamsService: TeamsService);
    create(dto: CreateTaskDto): Promise<Task>;
    findAllWithAssignee(): Promise<({
        assignee: import("../teams/team.entity").TeamMember;
        _id: any;
        description: string;
        dueDate?: Date;
        assigneeId?: string;
        assigneeName?: string;
        status: TaskStatus;
        metadata?: Record<string, any>;
    } | {
        assignee: null;
        _id: any;
        description: string;
        dueDate?: Date;
        assigneeId?: string;
        assigneeName?: string;
        status: TaskStatus;
        metadata?: Record<string, any>;
    })[]>;
    findById(id: string): Promise<Task>;
    update(id: string, dto: UpdateTaskDto): Promise<Task>;
    assignToTeamMember(taskId: string, teamId: string, memberId: string): Promise<Task>;
}
