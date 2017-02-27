import { SDG } from '../sdg-details/sdg';

export class Action {
    
    id: number;
    name: string;
    desc: string;
    rationales : string[];
    goals: SDG[];
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.rationales = [];
        this.desc = "";
        this.goals = [];
    }
}