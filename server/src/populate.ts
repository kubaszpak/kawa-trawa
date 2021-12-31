import { Connection } from "typeorm"
import { Address } from "./entity/Address";
import { Category } from "./entity/Category";
import { Complaint } from "./entity/Complaint";
import { CouponCode } from "./entity/CouponCode";
import { Discount } from "./entity/Discount";
import { Order, OrderStatus } from "./entity/Order";
import { Product } from "./entity/Product";
import { AccountType, User } from "./entity/User";

async function populateDatabaseWithTestData(connection: Connection) {
    const addressRepository = connection.getRepository(Address)
    const userRepository = connection.getRepository(User)
    const categoryRepository = connection.getRepository(Category)
    const productRepository = connection.getRepository(Product)
    const orderRepository = connection.getRepository(Order)
    const complaintRepository = connection.getRepository(Complaint)
    const couponCodeRepository = connection.getRepository(CouponCode)
    const discountRepository = connection.getRepository(Discount)

    // cascade is true, so there is no need to save the address explicitly
    const address1 = addressRepository.create({
        "street": "Sezamkowa",
        "houseNumber": 1,
        "postCode": "66-100",
        "city": "Sulechow",
        "country": "Poland"
    })

    // Normal user
    const user1 = userRepository.create({
        "firstName": "John",
        "lastName": "Wick",
        "email": "email1@email.com",
        "phoneNumber": "1234563789",
        "password": "dummy",
        "address": address1
    })

    userRepository.save(user1)

    // cascade is true, so there is no need to save the address explicitly
    // User with no address
    const user2 = userRepository.create({
        "firstName": "George",
        "lastName": "Bush",
        "email": "email2@email.com",
        "phoneNumber": "1234563789",
        "password": "dummy",
    })

    userRepository.save(user2)

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

    userRepository.save(user3)

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

    userRepository.save(user4)

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

    userRepository.save(user5)

    // cascade is true, so there is no need to save the address explicitly
    const address5 = addressRepository.create({})


    const grassCategory = categoryRepository.create({
        "name": "Grass",
        "description": "Heals the mind",
        "pathToImage": "images/grass/grass.png"
    })

    categoryRepository.save(grassCategory)

    const coffeeCategory = categoryRepository.create({
        "name": "Coffee",
        "description": "Heals nothing",
        "pathToImage": "images/coffee/coffee.png"
    })

    categoryRepository.save(coffeeCategory)

    const productMintTea = productRepository.create({
        "categories": [grassCategory],
        "name": "Mint tee 30 teabags",
        "description": "Mentol zawarty w liściach tej rośliny zwiększa produkcję soków żołądkowych oraz ogranicza wydzielanie żółci, tym samym skutecznie a zarazem naturalnie łagodząc wzdęcia, kolki czy skurcze.",
        "pathToImage": "images/grass/mintTee.png",
        "price": 9,
        "quantity": 100,
        "visibility": true
    })

    productRepository.save(productMintTea)

    const productGreenTea = productRepository.create({
        "categories": [grassCategory],
        "name": "Green tee 100g",
        "description": "Napój przyrządzany wyłącznie z liści herbaty chińskiej (Camellia sinensis), które poddane zostały w czasie przetwarzania jedynie minimalnej oksydacji.",
        "pathToImage": "images/grass/greenTee.png",
        "price": 6,
        "quantity": 50,
        "visibility": true
    })

    productRepository.save(productGreenTea)

    const productBlackTea = productRepository.create({
        "categories": [grassCategory],
        "name": "Black tee 100g",
        "description": "Zawiera dużo teiny, przez co działa pobudzająco. Ma działanie antybakteryjne w układzie pokarmowym i wzmaga wydzielanie soków trawiennych. Zmniejsza ciśnienie krwi, przez co również wystąpienie chorób serca.",
        "pathToImage": "images/grass/blackTee.png",
        "price": 7,
        "quantity": 50,
        "visibility": true
    })

    productRepository.save(productBlackTea)

    const order1 = orderRepository.create({
        "address": address1,
        "user": user1,
        "status": OrderStatus.PAID,
        "products": [productMintTea, productGreenTea],
        "totalPrice": productMintTea.price + productGreenTea.price,
        "date": new Date()
    })

    orderRepository.save(order1)
    
    const coupon1 = couponCodeRepository.create({
        "DiscountCode": "2022",
        "endDate": new Date('January 31, 2022 23:59:59'),
        "DiscountSum": 50,
        "LowerBoundSum": 100
    })

    const coupon2 = couponCodeRepository.create({
        "DiscountCode": "2021",
        "endDate": new Date('December 31, 2021 23:59:59'),
        "DiscountSum": 1000,
        "LowerBoundSum": 10000
    })

    couponCodeRepository.save(coupon1)
    couponCodeRepository.save(coupon2)

    const complaint1 = complaintRepository.create({

    })

    const discount1 = discountRepository.create({
        "categories": [coffeeCategory, grassCategory],
        "products": [],
        "discountPercentage": 20,
        "name": "everything -20%",
        "endDate": new Date('January 31, 2022 23:59:59'),
    })

    const discount2 = discountRepository.create({
        "categories": [],
        "products": [productMintTea],
        "discountPercentage": 50,
        "name": "Mint Tea -50% to end of week",
        "endDate": new Date('January 31, 2022 23:59:59'),
    })

    discountRepository.save(discount1)
    discountRepository.save(discount2)
}

export default populateDatabaseWithTestData;