import { Connection } from "typeorm"
import { Address } from "./entity/Address";
import { AccountType, User } from "./entity/User";

async function populateDatabaseWithTestData(connection: Connection) {
    const addressRepository = connection.getRepository(Address)
    const userRepository = connection.getRepository(User)

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

}

export default populateDatabaseWithTestData;