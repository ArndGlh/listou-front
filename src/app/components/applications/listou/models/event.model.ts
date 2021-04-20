import { User } from "src/app/components/user/models/user.model";

export class Event {
	idEvent: number;
    title: string;
	description: string;
    eventDate: Date;
	location: string;
	owner: User;
	duration: string | undefined;
	collaborateurs: string[] | undefined;

	constructor(idEvent: number, title: string, description: string, eventDate: Date, location: string, owner: User, duration?: string, collaborateurs?: string[]){
        this.idEvent = idEvent;
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.location = location;
        this.owner = owner;
        this.duration = duration;
        this.collaborateurs = collaborateurs;
	}

}
