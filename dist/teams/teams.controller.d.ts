import { CreateTeamDto } from './dto/create-team.dto';
import { TeamsService } from './teams.service';
export declare class TeamsController {
    private readonly svc;
    constructor(svc: TeamsService);
    create(dto: CreateTeamDto): Promise<import("./team.entity").Team>;
    findAll(): Promise<import("./team.entity").Team[]>;
    findOne(id: string): Promise<import("./team.entity").Team>;
}
