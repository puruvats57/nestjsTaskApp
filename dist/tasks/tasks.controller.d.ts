import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly svc;
    constructor(svc: TasksService);
    create(dto: CreateTaskDto): Promise<import("./task.entity").Task>;
    findAll(): Promise<({
        assignee: import("../teams/team.entity").TeamMember;
        _id: any;
        description: string;
        dueDate?: Date;
        assigneeId?: string;
        assigneeName?: string;
        status: import("./task.entity").TaskStatus;
        metadata?: Record<string, any>;
    } | {
        assignee: null;
        _id: any;
        description: string;
        dueDate?: Date;
        assigneeId?: string;
        assigneeName?: string;
        status: import("./task.entity").TaskStatus;
        metadata?: Record<string, any>;
    })[]>;
    findOne(id: string): Promise<import("./task.entity").Task>;
    update(id: string, dto: UpdateTaskDto): Promise<import("./task.entity").Task>;
    assign(taskId: string, body: {
        teamId: string;
        memberId: string;
    }): Promise<import("./task.entity").Task>;
}
