export declare enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
    BLOCKED = "BLOCKED"
}
export declare class Task {
    _id: any;
    description: string;
    dueDate?: Date;
    assigneeId?: string;
    assigneeName?: string;
    status: TaskStatus;
    metadata?: Record<string, any>;
}
