import { Response } from "express";
import { ControllerError } from "../errors/controller-error";
import { DomainError } from "../../domain/errors/domain-error";

export const ok = (res: Response, data?: any) =>{
    return res.status(200).send({
        ok: true,
        data
    })
}

export const serverError = (res: Response, error?: any) => {
    if (error instanceof DomainError || error instanceof ControllerError) {
        return res.status(error.code).send({
            ok: false,
            error: error.message,
            identifier: error.name,
        });
    }

    if (error instanceof Error) {
        return res.status(500).send({
            ok: false,
            error: error.message,
            identifier: error.name,
        });
    }

    return res.status(500).send({
        ok: false,
        error,
        identifier: "unkwnown",
    });
};

export const badRequest = (res: Response, reason?: string) =>{
    return res.status(400).send({
        ok: false,
        reason
    })
}