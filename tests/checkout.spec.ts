import { test } from '@playwright/test';
import Home from "../pages/home";
import Cart from "../pages/cart";
import Login from '../pages/login';
import SignUp from "../pages/signup"
import Checkout from '../pages/checkout';
import Payment from '../pages/payment';
import Delete from '../pages/delete';
import { newCustomerProfile, getProduct } from "../util/generateData";

test('[ui] place order: register while checkout', async ({ page }) => {
  await page.goto('/');
  const home = new Home(page)
  const cart = new Cart(page)
  const login = new Login(page)
  const signup = new SignUp(page)
  const checkout = new Checkout(page)
  const payment = new Payment(page)
  const deleted = new Delete(page)
  await home.isHomeLoaded()
  await home.addProduct("1")
  await home.goToCart()
  await cart.isCartDisplayed()
  await cart.proceedToCheckout()
  await cart.registerAccount()
  const customer = newCustomerProfile()
  await login.signUp(customer)
  await signup.enterAccountInfo(customer)
  await signup.isAccountCreated()
  await signup.continue()
  await login.isUserLogin(`${customer.firstname} ${customer.lastname}`)
  await home.goToCartByMenu()
  await cart.proceedToCheckout()
  await checkout.verifyAddress(customer)
  const product = getProduct("product_a")
  await checkout.validateCart(product)
  await checkout.addComment()
  await checkout.placeOrder()
  await payment.addPaymentDetails(customer)
  await payment.isPaymentOk()
  await home.deleteAccount()
  await deleted.isDeleteOk()
});

test('[ui] place order: register before checkout', async ({ page }) => {
    await page.goto('/');
    const home = new Home(page)
    const cart = new Cart(page)
    const login = new Login(page)
    const signup = new SignUp(page)
    const checkout = new Checkout(page)
    const payment = new Payment(page)
    const deleted = new Delete(page)
    await home.isHomeLoaded()
    await home.signUp()
    const customer = newCustomerProfile()
    await login.signUp(customer)
    await signup.enterAccountInfo(customer)
    await signup.isAccountCreated()
    await signup.continue()
    await login.isUserLogin(`${customer.firstname} ${customer.lastname}`)
    await home.addProduct("1")
    await home.goToCart()
    await cart.isCartDisplayed()
    await cart.proceedToCheckout()
    await checkout.verifyAddress(customer)
    const product = getProduct("product_a")
    await checkout.validateCart(product)
    await checkout.addComment()
    await checkout.placeOrder()
    await payment.addPaymentDetails(customer)
    await payment.isPaymentOk()
    await home.deleteAccount()
    await deleted.isDeleteOk()
  });