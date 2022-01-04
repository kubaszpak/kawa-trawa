// import { getRepository } from "typeorm";
// import { NextFunction, Request, Response } from "express";
// import { Complaint } from "../entity/Complaint";

// export default class ComplaintController {

//     private complaintRepository = getRepository(Complaint);

//     async all(request: Request, response: Response, next: NextFunction) {
//         return this.complaintRepository.find();
//     }

//     async one(request: Request, response: Response, next: NextFunction) {
//         return this.complaintRepository.findOne(request.params.id);
//     }

//     async save(request: Request, response: Response, next: NextFunction) {
//         return this.complaintRepository.save(request.body);
//     }

//     async remove(request: Request, response: Response, next: NextFunction) {
//         const complaintToRemove = await this.complaintRepository.findOne(request.params.id);
//         if (!complaintToRemove) throw Error('Complaint with given id not found in the database')
//         await this.complaintRepository.remove(complaintToRemove);
//     }

// }