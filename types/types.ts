export type User = {
    email: string;
    password: string;
    name: string
};

export type Customer = {
    emailaddress: string;
    password: string;
    firstname: string;
    lastname: string;
    address: string
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobilenumber: string;
    ccnumber?: string;
    cccvv?: string;
    ccexpiremo?: string;
    ccexpireyear?: string
}

export type Product = {
    description: string;
    price: string;
    quantity: string
}