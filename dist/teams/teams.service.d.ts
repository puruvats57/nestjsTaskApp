import { MongoRepository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
export declare class TeamsService {
    private repo;
    constructor(repo: MongoRepository<Team>);
    create(dto: CreateTeamDto): Promise<Team>;
    findAll(): Promise<Team[]>;
    findById(id: string): Promise<Team>;
}
