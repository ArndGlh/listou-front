export class Notifications {
    notificationId: number;
    userId: number;
    username: string;
    text: string;
    type: string;
    category: string;
    date: Date;
    state: string;

    constructor(notificationId: number, userId: number, username: string, text: string, type: string, category: string, date: Date, state: string){
        this.notificationId = notificationId;
        this.userId = userId;
        this.username = username;
        this.text = text;
        this.type = type;
        this.category = category;
        this.date = date;
        this.state = state;
    }
}
