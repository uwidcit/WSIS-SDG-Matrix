import { SDG } from '../sdg-details/sdg';

export class Action {
    id: number;
    name: string;
    desc: string;
    rationales : string[];
    sdgs: SDG[];
    iconUrl: string;
    
    constructor(id: number, name: string, iconUrl: string) {
        this.id = id;
        this.name = name;
        this.iconUrl = iconUrl;
        this.rationales = [];
        this.desc = "";
        this.sdgs = [];
    }
}