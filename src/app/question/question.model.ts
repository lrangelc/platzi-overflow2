import { Answer } from '../answer/answer.model';
// import { User } from '../auth/user.model';

export class Question {
    _id?: string;
    title: string;
    description: string;
    createdAt?: Date;
    icon?: string;
    answers: Answer[];
    // user?: User;

    constructor(title: string,
        description: string,
        createdAt?: Date,
        icon?: string
    ) {
        this._id = '1';
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.icon = icon;
        this.answers = [];
        // this.user = new User('','','','');
    }
}