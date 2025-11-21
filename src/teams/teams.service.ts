import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(@InjectRepository(Team) private repo: MongoRepository<Team>) {}

  async create(dto: CreateTeamDto) {
    const team = this.repo.create({
      name: dto.name,
      members: dto.members
    });
    return this.repo.save(team);
  }

  async findAll(): Promise<Team[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Team> {
    const team = await this.repo.findOneBy({ _id: new ObjectId(id) });
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }
}
