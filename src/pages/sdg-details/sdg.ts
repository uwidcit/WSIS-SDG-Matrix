import { Action } from '../action-details/action';

export class SDG {
    id: number;
    name: string;
    desc: string;
    actions: Action[];
    photoUrl: string;
    iconUrl: string;
    
    constructor(id: number, name: string, photoUrl: string, iconUrl: string) { 
        this.id = id;
        this.name = name;
        this.photoUrl = photoUrl;
        this.iconUrl = iconUrl;
    }
}