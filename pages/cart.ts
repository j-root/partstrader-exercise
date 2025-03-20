import { Page, expect } from "@playwright/test";

export default class Cart {

  constructor(private page: Page) {}
  private Elements = {};

  async isCartDisplayed(){
    await expect(this.page.locator('//*[@id="cart_info"]')).toBeVisible()
  }

  async proceedToCheckout(){
    await this.page.getByText("Proceed To Checkout").click()
  }

  async registerAccount(){
    await this.page.getByRole("link", {
        name: "Register / Login"
    }).click()
  }
}