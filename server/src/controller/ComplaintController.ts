import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Complaint } from "../entity/Complaint";
import { User, AccountType } from "../entity/User";

export default class ComplaintController {

    private complaintRepository = getRepository(Complaint);
    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne((request as any).userId)
        if (user.accountType == AccountType.EMPLOYEE || user.accountType == AccountType.ADMIN) {
            return this.complaintRepository.find();
        }
        response.status(403).send("Acces denied");
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne((request as any).userId)
        const complaint = await this.complaintRepository.findOne(request.params.id)
        if (user.id == complaint.user.id || user.accountType == AccountType.EMPLOYEE || user.accountType == AccountType.ADMIN)
            return complaint;
        response.status(403).send("Acces denied");
    }

    async save(request: Request, response: Response, next: NextFunction) {
        request.body.user = await this.userRepository.findOne((request as any).userId)
        return this.complaintRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne((request as any).userId)
        const complaintToRemove = await this.complaintRepository.findOne(request.params.id);
        if (!complaintToRemove) throw Error('Complaint with given id not found in the database')

        if (user.id == complaintToRemove.user.id || user.accountType == AccountType.EMPLOYEE || user.accountType == AccountType.ADMIN) {

            return this.complaintRepository.remove(complaintToRemove);
        }
        response.status(403).send("Acces denied");
    }

}