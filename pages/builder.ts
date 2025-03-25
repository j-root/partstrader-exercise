import { Page } from "@playwright/test"
import Home from "../pages/home"
import Cart from "../pages/cart"
import Login from "../pages/login"
import SignUp from "../pages/signup"
import Checkout from "../pages/checkout"
import Payment from "../pages/payment"
import Delete from "../pages/delete"

class PageBuilder {
    home: Home;
    cart: Cart;
    login: Login;
    signup: SignUp;
    checkout: Checkout;
    payment: Payment;
    deleted: Delete;

    constructor(page: Page){
        this.home = new Home(page);
        this.cart = new Cart(page);
        this.login = new Login(page);
        this.signup = new SignUp(page);
        this.checkout = new Checkout(page);
        this.payment = new Payment(page);
        this.deleted = new Delete(page);
    }
}

export default PageBuilder;