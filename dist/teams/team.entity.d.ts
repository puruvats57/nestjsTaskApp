export declare class TeamMember {
    id: string;
    name: string;
    email?: string;
}
export declare class Team {
    _id: any;
    name: string;
    members: TeamMember[];
}
