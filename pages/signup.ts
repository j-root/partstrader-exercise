import { Page, expect } from "@playwright/test";
import { Customer } from "../types/types"

export default class SignUp {

  constructor(private page: Page) {}

  private Elements = {
    nameTxtbx: "name",
    passwordTxtbx: "password",
    fNameTxtbx: "first_name",
    lNameTxtbx: "last_name",
    addressTxtbx: "address",
    countryDrpdwn: "country",
    stateTxtbx: "state",
    cityTxtbx: "city", 
    zipcodeTxtbx: "zipcode", 
    mobileTxtbx: "mobile_number",
    createBtn: "create-account",
    accountBanner: "account-created",
    continueBtn: 'continue-button'
  };

  async enterAccountInfo(customer: Customer) {
    await this.page.getByTestId(this.Elements.passwordTxtbx).fill(customer.password)
    await this.page.getByTestId(this.Elements.fNameTxtbx).fill(customer.firstname)
    await this.page.getByTestId(this.Elements.lNameTxtbx).fill(customer.lastname)
    await this.page.getByTestId(this.Elements.addressTxtbx).fill(customer.address)
    const country = this.page.getByTestId(this.Elements.countryDrpdwn)
    await country.selectOption(customer.country)
    await this.page.getByTestId(this.Elements.stateTxtbx).fill(customer.state)
    await this.page.getByTestId(this.Elements.cityTxtbx).fill(customer.city)
    await this.page.getByTestId(this.Elements.zipcodeTxtbx).fill(customer.zipcode)
    await this.page.getByTestId(this.Elements.mobileTxtbx).fill(customer.mobilenumber)
    await this.page.getByTestId(this.Elements.createBtn).click()
  }

  async isAccountCreated(){
    await expect(this.page.getByTestId(this.Elements.accountBanner)).toBeVisible()
  }

  async continue(){
    await this.page.getByTestId(this.Elements.continueBtn).click()
  }
}