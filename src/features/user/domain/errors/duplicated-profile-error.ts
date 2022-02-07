import { DomainError } from "../../../../core/domain/errors/domain-error";

export class DuplicatedProfileError extends DomainError {
    constructor() {
        super("User already registered", 409);
        this.name = "DuplicatedProfileError";
    }
}
