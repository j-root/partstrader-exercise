import { Page, expect } from "@playwright/test";

export default class Home {

  constructor(private page: Page) {}
  private Elements = {};

  async isHomeLoaded(){
    await expect(this.page.getByRole('link', { name: ' Home' })).toBeVisible()
  }

  async addProduct(count: string){
    await this.page.locator(`a[data-product-id="${count}"]`).first().hover()
    await this.page.locator(`a[data-product-id="${count}"]`).first().click()
  }

  async goToCart(){
    await this.page.getByRole("link", {
        name: "View Cart"
    }).click()
  }

  async goToCartByMenu(){
    await this.page.getByRole('link', { name: ' Cart' }).click()
  }

  async deleteAccount(){
    await this.page.getByRole('link', { name: ' Delete Account' }).click()
  }

  async signUp(){
    await this.page.getByRole('link', { name: ' Signup / Login' }).click()
  }
}