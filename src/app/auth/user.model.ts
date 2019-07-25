export class User {
    constructor(
        public firstName: string,
        public lastName: string
    ) {

    }

    fullName () {
        return `${this.firstName} ${this.lastName}`;
    }
}