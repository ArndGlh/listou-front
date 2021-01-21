import { Role } from "./role.model";

export class User {
	id: number | undefined;
	username: string | undefined;
    email: string | undefined;
	roles: Role[] | undefined;

	constructor(id?: number, username?: string, email?: string, roles?: Role[]){
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
	}
}