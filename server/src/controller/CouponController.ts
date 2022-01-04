import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { CouponCode } from "../entity/CouponCode";

export default class ComplaintController {

    private couponCodesRepository = getRepository(CouponCode);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.couponCodesRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.couponCodesRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.couponCodesRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const couponToRemove = await this.couponCodesRepository.findOne(request.params.id);
        if (!couponToRemove) throw Error('Coupon with given id not found in the database')
        await this.couponCodesRepository.remove(couponToRemove);
    }

}