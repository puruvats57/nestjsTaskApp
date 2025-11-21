import { Column, Entity, ObjectIdColumn } from 'typeorm';

export class TeamMember {
  id!: string;
  name!: string;
  email?: string;
}

@Entity('teams')
export class Team {
  @ObjectIdColumn()
  _id!: any;

  @Column()
  name!: string;

  @Column()
  members!: TeamMember[]; // simple array of members
}
