import { ControllerError } from "./controller-error";


export class NotProvidedError extends ControllerError {
    constructor(field: string) {
        super(`${field} not provided`);
        this.name = "NotProvidedError";
    }
}
