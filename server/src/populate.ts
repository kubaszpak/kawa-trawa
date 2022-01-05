import { Connection } from "typeorm"
import { Address } from "./entity/Address";
import { Category } from "./entity/Category";
import { Complaint, ComplaintStatus } from "./entity/Complaint";
import { CouponCode } from "./entity/CouponCode";
import { Discount } from "./entity/Discount";
import { Order } from "./entity/Order";
import { Product } from "./entity/Product";
import { AccountType, User } from "./entity/User";

async function populateDatabaseWithTestData(connection: Connection) {
    const addressRepository = connection.getRepository(Address)
    const userRepository = connection.getRepository(User)
    const productRepository = connection.getRepository(Product)
    const orderRepository = connection.getRepository(Order)
    const categoryRepository = connection.getRepository(Category)
    const discountRepository = connection.getRepository(Discount)
    const complaintRepository = connection.getRepository(Complaint)
    const couponCodeRepository = connection.getRepository(CouponCode)

    // cascade is true, so there is no need to save the address explicitly
    const address1 = addressRepository.create({
        "street": "Sezamkowa",
        "houseNumber": 1,
        "postCode": "66-100",
        "city": "Sulechow",
        "country": "Poland"
    })

    await addressRepository.save(address1)

    // Normal user
    let user1 = userRepository.create({
        "firstName": "John",
        "lastName": "Wick",
        "email": "email1@email.com",
        "phoneNumber": "1234563789",
        "password": "dummy",
        "address": address1
    })

    await userRepository.save(user1)

    // Admin user
    let adminUser = userRepository.create({
        "firstName": "admin",
        "lastName": "admin",
        "email": "admin@email.com",
        "phoneNumber": "1234563789",
        "password": "admin",
        "accountType": AccountType.ADMIN
    })

    await userRepository.save(adminUser)

    // Employee user
    let employee = userRepository.create({
        "firstName": "emp",
        "lastName": "emp",
        "email": "emp@email.com",
        "phoneNumber": "1234563789",
        "password": "emp",
        "accountType": AccountType.EMPLOYEE
    })

    await userRepository.save(employee)

    // cascade is true, so there is no need to save the address explicitly
    // User with no address
    const user2 = userRepository.create({
        "firstName": "George",
        "lastName": "Bush",
        "email": "email2@email.com",
        "phoneNumber": "1234563789",
        "password": "dummy",
    })

    await userRepository.save(user2)

    // cascade is true, so there is no need to save the address explicitly
    const address2 = addressRepository.create({
        "street": "Sezamkowa",
        "houseNumber": 2,
        "flatNumber": 1,
        "postCode": "66-100",
        "city": "Sulechow",
        "country": "Poland"
    })

    // User with address with a flat
    const user3 = userRepository.create({
        "firstName": "Tomasz",
        "lastName": "Karolak",
        "email": "email3@email.com",
        "phoneNumber": "1234563789",
        "password": "dummy",
        "address": address2
    })

    await userRepository.save(user3)

    // cascade is true, so there is no need to save the address explicitly
    const address3 = addressRepository.create({
        "street": "Sezamkowa",
        "houseNumber": 3,
        "flatNumber": 3,
        "postCode": "66-100",
        "city": "Sulechow",
        "country": "Poland"
    })

    // User with balance > 0, banned=true and accountType="employee"
    const user4 = userRepository.create({
        "firstName": "Steve",
        "lastName": "Carell",
        "email": "email4@email.com",
        "phoneNumber": "1234563789",
        "password": "dummy",
        "address": address3,
        "balance": 100,
        "banned": true,
        "confirmed": true,
        "accountType": AccountType.EMPLOYEE
    })

    await userRepository.save(user4)

    // cascade is true, so there is no need to save the address explicitly
    const address4 = addressRepository.create({
        "street": "Sezamkowa",
        "houseNumber": 4,
        "postCode": "66-100",
        "city": "Sulechow",
        "country": "Poland"
    })

    // User with admin rights
    const user5 = userRepository.create({
        "firstName": "Steve",
        "lastName": "Jobs",
        "email": "email5@email.com",
        "phoneNumber": "1234563789",
        "password": "dummy",
        "address": address4,
        "accountType": AccountType.ADMIN
    })

    await userRepository.save(user5)


    const grassCategory = categoryRepository.create({
        "name": "Grass",
        "description": "Heals the mind",
        "pathToImage": "images/grass/grass.png"
    })

    await categoryRepository.save(grassCategory)

    const coffeeCategory = categoryRepository.create({
        "name": "Coffee",
        "description": "Heals nothing",
        "pathToImage": "images/coffee/coffee.png"
    })

    await categoryRepository.save(coffeeCategory)

    const subCoffeeCategory1 = categoryRepository.create({
        "name": "sub Coffee 1",
        "description": "Heals nothing 1",
        "pathToImage": "images/coffee/subcoffee1.png",
        "parent": coffeeCategory
    })

    await categoryRepository.save(subCoffeeCategory1)

    const subCoffeeCategory2 = categoryRepository.create({
        "name": "sub Coffee 2",
        "description": "Heals nothing 2",
        "pathToImage": "images/coffee/subcoffee2.png",
        "parent": coffeeCategory
    })

    await categoryRepository.save(subCoffeeCategory2)



    const productMintTea = productRepository.create({
        "categories": [grassCategory],
        "name": "Mint tee 30 teabags",
        "description": "Mentol zawarty w liściach tej rośliny zwiększa produkcję soków żołądkowych oraz ogranicza wydzielanie żółci, tym samym skutecznie a zarazem naturalnie łagodząc wzdęcia, kolki czy skurcze.",
        "pathToImage": "images/grass/mintTee.png",
        "price": 9,
        "quantity": 100,
        "visibility": true
    })

    await productRepository.save(productMintTea)

    const productGreenTea = productRepository.create({
        "categories": [grassCategory, subCoffeeCategory1],
        "name": "Green tee 100g",
        "description": "Napój przyrządzany wyłącznie z liści herbaty chińskiej (Camellia sinensis), które poddane zostały w czasie przetwarzania jedynie minimalnej oksydacji.",
        "pathToImage": "images/grass/greenTee.png",
        "price": 6,
        "quantity": 50,
        "visibility": true
    })

    await productRepository.save(productGreenTea)


    const productBlackTea = productRepository.create({
        "categories": [grassCategory],
        "name": "Black tee 100g",
        "description": "Zawiera dużo teiny, przez co działa pobudzająco. Ma działanie antybakteryjne w układzie pokarmowym i wzmaga wydzielanie soków trawiennych. Zmniejsza ciśnienie krwi, przez co również wystąpienie chorób serca.",
        "pathToImage": "images/grass/blackTee.png",
        "price": 7,
        "quantity": 50,
        "visibility": true
    })

    await productRepository.save(productBlackTea)

    const order1 = orderRepository.create({
        "address": address1,
        "user": user1,
        "products": [productMintTea, productGreenTea],
        "totalPrice": 20,
        "date": new Date()
    })

    await orderRepository.save(order1)

    const order2 = orderRepository.create({
        "address": address3,
        "user": user4,
        "products": [productBlackTea, productBlackTea],
        "totalPrice": 40,
        "date": new Date()
    })

    await orderRepository.save(order2)

    const coupon1 = couponCodeRepository.create({
        "discountCode": "2022",
        "endDate": new Date('January 31, 2022 23:59:59'),
        "discountSum": 50,
        "lowerBoundSum": 100
    })

    couponCodeRepository.save(coupon1)

    const coupon2 = couponCodeRepository.create({
        "discountCode": "2021",
        "endDate": new Date('December 31, 2021 23:59:59'),
        "discountSum": 1000,
    })

    couponCodeRepository.save(coupon2)


    const discount1 = discountRepository.create({
        "categories": [coffeeCategory, grassCategory],
        "products": [],
        "discountPercentage": 20,
        "name": "everything -20%",
        "endDate": new Date('January 31, 2022 23:59:59'),
    })

    await discountRepository.save(discount1)

    const discount2 = discountRepository.create({
        "categories": [],
        "products": [productMintTea],
        "discountPercentage": 50,
        "name": "Mint Tea -50% to end of week",
        "endDate": new Date('January 31, 2022 23:59:59'),
    })

    await discountRepository.save(discount2)

    const complaint1 = complaintRepository.create({
        "date": new Date(),
        "user": user1,
        "order": order1,
        "description": "Słaba kawa"
    })

    await complaintRepository.save(complaint1)

    // try {
    //     const complaintNoOrder = complaintRepository.create({
    //         "date": new Date(),
    //         "user": user1,
    //         "description": "Słaba kawa",
    //         "status": ComplaintStatus.CANCELLED
    //     })

    //     await complaintRepository.save(complaintNoOrder)
    // } catch (error) {
    //     console.log("Correct complaintNoOrder: Complaint without an order should not be possible to create!")
    // }

    // try {
    //     const complaintNoUser = complaintRepository.create({
    //         "date": new Date(),
    //         "order": order2,
    //         "description": "Słaba kawa"
    //     })

    //     await complaintRepository.save(complaintNoUser)
    // } catch (error) {
    //     console.log("Correct complaintNoUser: Complaint without an user should not be possible to create!")
    // }

    // try {
    //     const secondComplaintForOrder1 = complaintRepository.create({
    //         "date": new Date(),
    //         "user": user1,
    //         "order": order1,
    //         "description": "Słaba kawa"
    //     })

    //     await complaintRepository.save(secondComplaintForOrder1)
    // } catch (error) {
    //     console.log("Correct secondComplaintForOrder1: There can be only one complaint for each order!")
    // }

    // one users can make as many complaints as they want, as long as each complaint is about a different order
    const secondComplaintForUser1 = complaintRepository.create({
        "date": new Date(),
        "user": user1,
        "order": order2,
        "description": "Słaba kawa",
        "status": ComplaintStatus.RECEIVED
    })

    await complaintRepository.save(secondComplaintForUser1)
}

export default populateDatabaseWithTestData;