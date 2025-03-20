import { Page, expect } from "@playwright/test";
import { Customer, Product } from "../types/types";

export default class Checkout {

  constructor(private page: Page) {}
  private Elements = {};

  async verifyAddress(customer: Customer){
    await expect(this.page.locator('#address_delivery')
        .getByText(`${customer.firstname} ${customer.lastname}`)).toBeVisible()
    await expect(this.page.locator('#address_delivery').getByText(customer.address)).toBeVisible()
    await expect(this.page.locator('#address_delivery').getByText(customer.state)).toBeVisible()
    await expect(this.page.locator('#address_delivery').getByText(customer.city)).toBeVisible()
    await expect(this.page.locator('#address_delivery').getByText(customer.country)).toBeVisible()
    await expect(this.page.locator('#address_delivery').getByText(customer.zipcode)).toBeVisible()
    await expect(this.page.locator('#address_delivery').getByText(customer.mobilenumber)).toBeVisible()
  }

  async validateCart(product: Product){
    const row = this.page.locator("#product-1")
    await expect(row.getByRole('link', { name: product.description })).toBeVisible()
    await expect(row.getByText(product.price).first()).toBeVisible()
    await expect(row.getByRole('button', { name: product.quantity })).toBeVisible()
    const total = await this.page.getByRole('row', { name: 'Total Amount Rs.' }).innerText()
    expect(total).toContain(product.price)
  }

  async addComment(){
    await this.page.locator('textarea[name="message"]').fill("This is an automated order.")
  }

  async placeOrder(){
    await this.page.getByRole('link', { name: 'Place Order' }).click()
  }
}