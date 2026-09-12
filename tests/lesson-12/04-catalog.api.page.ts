import {APIRequestContext, expect} from "@playwright/test";

export class CataLogApiPage {
  request: APIRequestContext;
  baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = "https://material.playwrightvn.com/api/product-catalog/v1";
  }

  //Get all products
  async getAll() {
    const response = await this.request.get(`${this.baseUrl}/products.php`);
    const responseJson = await response.json();
    expect(response.status()).toBe(200);
    return responseJson;
  }
}