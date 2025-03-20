import { Page, expect } from "@playwright/test";
import { Customer } from "../types/types";

export default class Payment {

  constructor(private page: Page) {}
  private Elements = {
    nameTxtbx: "name-on-card", 
    cardNoTxbx: "card-number", 
    cvcTxtbx: "cvc", 
    expiryMonthTxtbx: "expiry-month",
    expiryYearTxtbx: "expiry-year",
    payBtn: "pay-button",
    orderPlacedBanner: "order-placed",
    continueBtn: "continue-button"
  };

  async addPaymentDetails(customer: Customer){
    await this.page.getByTestId(this.Elements.nameTxtbx).fill(`${customer.firstname} ${customer.lastname}`)
    await this.page.getByTestId(this.Elements.cardNoTxbx).fill(customer.ccnumber || "")
    await this.page.getByTestId(this.Elements.cvcTxtbx).fill(customer.cccvv || "")
    await this.page.getByTestId(this.Elements.expiryMonthTxtbx).fill(customer.ccexpiremo || "")
    await this.page.getByTestId(this.Elements.expiryYearTxtbx).fill(customer.ccexpireyear || "")
    await this.page.getByTestId(this.Elements.payBtn).click()
  }

  async isPaymentOk(){
    await expect(this.page.getByTestId(this.Elements.orderPlacedBanner)).toBeVisible()
  }
}