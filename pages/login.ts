import { Page, expect } from "@playwright/test";
import { User, Customer } from "../types/types"

export default class Login {

  constructor(private page: Page) {}

  private Elements = {
    emailTxtbx: "login-email",
    passwordTxtbx: "login-password",
    loginBtn: "login-button",
    signupNameTxtbx: "signup-name",
    signupMailTxtbx: "signup-email",
    signupBtn: "signup-button"
  };

  async signin(user: User) {
    const promise = this.page.waitForResponse("https://automationexercise.com/login")
    await this.page.getByTestId(this.Elements.emailTxtbx).fill(user.email)
    await this.page.getByTestId(this.Elements.passwordTxtbx).fill(user.password)
    await this.page.getByTestId(this.Elements.loginBtn).click()
    const resp = await promise
    expect(resp.status()).toBe(302)
  }

  async isUserLogin(name: string) {
    await expect(this.page.getByTestId(this.Elements.loginBtn)).not.toBeVisible()
    await expect(this.page.getByText(" Logged in as ")).toBeVisible()
    await expect(this.page.getByText(name)).toBeVisible()
  }

  async signUp(customer: Customer) {
    await this.page.getByTestId(this.Elements.signupNameTxtbx)
      .fill(`${customer.firstname} ${customer.lastname}`)
    await this.page.getByTestId(this.Elements.signupMailTxtbx).fill(customer.emailaddress)
    await this.page.getByTestId(this.Elements.signupBtn).click()
  }
}