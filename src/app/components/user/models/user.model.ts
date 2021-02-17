import { Role } from "./role.model";

export class User {
	id: number;
	username: string | undefined;
    email: string | undefined;
	roles: Role[];
	imageName: string | undefined;
	accessToken: string;
	tokenType: string;

	constructor(accessToken: string, tokenType: string, roles: Role[], id: number, username?: string, email?: string, imageName?: string){
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
		this.imageName = imageName;
		this.accessToken = accessToken;
		this.tokenType = tokenType;
	}

}
