import {APIRequestContext, expect } from '@playwright/test';

export class TodoApiPage {
  request: APIRequestContext;
  baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = 'https://material.playwrightvn.com/api/todo-app/v1';
  }

  //Get all todos
  async getAll() {
    const response = await this.request.get(`${this.baseUrl}/todos.php`);
    const responseJson = await response.json();
    expect(response.status()).toBe(200);
    return responseJson;
  }
  //Get single todo
  async getTodo(id: number) {
    const response = await this.request.get(`${this.baseUrl}/todos.php?id=${id}`);
    const responseJson = await response.json();
    expect(response.status()).toBe(200);
    return responseJson;
  }
  //Create todo

  //Update todo

  //Update partial todo

  //Delete todo
}