import { Page, expect } from "@playwright/test";

export default class Delete {

  constructor(private page: Page) {}
  private Elements = {
    deleteBanner: "account-deleted"
  };

  async isDeleteOk(){
    await expect(this.page.getByTestId(this.Elements.deleteBanner)).toBeVisible()
  }
}