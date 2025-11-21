"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
const task_entity_1 = require("./task.entity");
const teams_service_1 = require("../teams/teams.service");
let TasksService = class TasksService {
    constructor(repo, teamsService) {
        this.repo = repo;
        this.teamsService = teamsService;
    }
    async create(dto) {
        const task = this.repo.create({
            description: dto.description,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
            assigneeId: dto.assigneeId,
            assigneeName: dto.assigneeName,
            status: dto.status ?? task_entity_1.TaskStatus.OPEN,
            metadata: dto.metadata ?? {}
        });
        return this.repo.save(task);
    }
    async findAllWithAssignee() {
        const tasks = await this.repo.find();
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
    async findById(id) {
        const t = await this.repo.findOneBy({ _id: new mongodb_1.ObjectId(id) });
        if (!t)
            throw new common_1.NotFoundException('Task not found');
        return t;
    }
    async update(id, dto) {
        const task = await this.repo.findOneBy({ _id: new mongodb_1.ObjectId(id) });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        if (dto.description !== undefined)
            task.description = dto.description;
        if (dto.dueDate !== undefined)
            task.dueDate = new Date(dto.dueDate);
        if (dto.assigneeId !== undefined)
            task.assigneeId = dto.assigneeId;
        if (dto.assigneeName !== undefined)
            task.assigneeName = dto.assigneeName;
        if (dto.status !== undefined)
            task.status = dto.status;
        if (dto.metadata !== undefined)
            task.metadata = dto.metadata;
        return this.repo.save(task);
    }
    async assignToTeamMember(taskId, teamId, memberId) {
        const team = await this.teamsService.findById(teamId);
        const member = team.members.find(m => m.id === memberId);
        if (!member)
            throw new common_1.NotFoundException('Member not found in team');
        const task = await this.repo.findOneBy({ _id: new mongodb_1.ObjectId(taskId) });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        task.assigneeId = member.id;
        task.assigneeName = member.name;
        return this.repo.save(task);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository,
        teams_service_1.TeamsService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map