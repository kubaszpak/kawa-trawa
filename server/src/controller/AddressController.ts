import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Address } from "../entity/Address";

export default class AddressController {

    private addressRepository = getRepository(Address);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.addressRepository.find();
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.addressRepository.save(request.body);
    }

    async edit(request: Request, response: Response, next: NextFunction) {
        const address = await this.addressRepository.findOne(request.params.id)
        if (!address) throw Error('Address with given id not found in the database');
        return this.addressRepository.update(address.id ,request.body);
    }

}