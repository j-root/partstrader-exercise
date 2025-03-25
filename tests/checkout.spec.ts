import { test } from '@playwright/test';
import PageBuilder from '../pages/builder';
import { newCustomerProfile, getProduct } from "../util/generateData";

test('[ui] place order: register while checkout', async ({ page }) => {
  await page.goto('/');
  const pages = new PageBuilder(page)
  await pages.home.isHomeLoaded()
  await pages.home.addProduct("1")
  await pages.home.goToCart()
  await pages.cart.isCartDisplayed()
  await pages.cart.proceedToCheckout()
  await pages.cart.registerAccount()
  const customer = newCustomerProfile()
  await pages.login.signUp(customer)
  await pages.signup.enterAccountInfo(customer)
  await pages.signup.isAccountCreated()
  await pages.signup.continue()
  await pages.login.isUserLogin(`${customer.firstname} ${customer.lastname}`)
  await pages.home.goToCartByMenu()
  await pages.cart.proceedToCheckout()
  await pages.checkout.verifyAddress(customer)
  const product = getProduct("product_a")
  await pages.checkout.validateCart(product)
  await pages.checkout.addComment()
  await pages.checkout.placeOrder()
  await pages.payment.addPaymentDetails(customer)
  await pages.payment.isPaymentOk()
  await pages.home.deleteAccount()
  await pages.deleted.isDeleteOk()
});

test('[ui] place order: register before checkout', async ({ page }) => {
    await page.goto('/');
    const pages = new PageBuilder(page)
    await pages.home.isHomeLoaded()
    await pages.home.signUp()
    const customer = newCustomerProfile()
    await pages.login.signUp(customer)
    await pages.signup.enterAccountInfo(customer)
    await pages.signup.isAccountCreated()
    await pages.signup.continue()
    await pages.login.isUserLogin(`${customer.firstname} ${customer.lastname}`)
    await pages.home.addProduct("1")
    await pages.home.goToCart()
    await pages.cart.isCartDisplayed()
    await pages.cart.proceedToCheckout()
    await pages.checkout.verifyAddress(customer)
    const product = getProduct("product_a")
    await pages.checkout.validateCart(product)
    await pages.checkout.addComment()
    await pages.checkout.placeOrder()
    await pages.payment.addPaymentDetails(customer)
    await pages.payment.isPaymentOk()
    await pages.home.deleteAccount()
    await pages.deleted.isDeleteOk()
  });