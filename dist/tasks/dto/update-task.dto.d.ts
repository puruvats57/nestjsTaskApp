import { TaskStatus } from '../task.entity';
export declare class UpdateTaskDto {
    description?: string;
    dueDate?: string;
    assigneeId?: string;
    assigneeName?: string;
    status?: TaskStatus;
    metadata?: Record<string, any>;
}
