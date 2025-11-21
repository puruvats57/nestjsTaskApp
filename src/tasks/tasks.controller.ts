import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly svc: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAllWithAssignee();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.svc.update(id, dto);
  }

  @Post(':id/assign')
  assign(
    @Param('id') taskId: string,
    @Body() body: { teamId: string; memberId: string }
  ) {
    return this.svc.assignToTeamMember(taskId, body.teamId, body.memberId);
  }
}
