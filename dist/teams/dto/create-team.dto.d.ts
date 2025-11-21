declare class MemberDto {
    id: string;
    name: string;
    email?: string;
}
export declare class CreateTeamDto {
    name: string;
    members: MemberDto[];
}
export {};
