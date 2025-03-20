import { faker } from "@faker-js/faker";
import { Customer, Product } from "../types/types"
import fs from "fs";
import path from "path";

export function newCustomerProfile(){
    return {
        emailaddress: faker.internet.email(),
        password: faker.internet.password(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        address: faker.location.street(),
        country: "New Zealand",
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobilenumber: faker.phone.number(),
        ccnumber: faker.finance.creditCardNumber(),
        cccvv: faker.finance.creditCardCVV(),
        ccexpiremo: "03", 
        ccexpireyear: "2029"
    } as Customer
}

export function getProduct(name: string){
    const products = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "./product.json")).toString()
    );
    return {
        description: products[name].description,
        price: products[name].price,
        quantity: products[name].quantity
    } as Product
}