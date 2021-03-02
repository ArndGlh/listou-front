import { ComSubject } from "./com-subject";

export class Suggestion {
    subjectSuggestion: string;
    comment: string;

    constructor(subjectSuggestion: string, comment: string){
        this.subjectSuggestion = subjectSuggestion;
        this.comment = comment;
    }
}
