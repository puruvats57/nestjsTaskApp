import { Column, Entity, ObjectIdColumn } from 'typeorm';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  BLOCKED = 'BLOCKED'
}

@Entity('tasks')
export class Task {
  @ObjectIdColumn()
  _id!: any;

  @Column()
  description!: string;

  @Column()
  dueDate?: Date;

  // assignee points to a team member id (string)
  @Column()
  assigneeId?: string;

  @Column()
  assigneeName?: string;

  @Column()
  status!: TaskStatus;

  @Column()
  metadata?: Record<string, any>;
}
