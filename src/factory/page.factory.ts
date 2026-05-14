import type { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

export class PageFactory {
  private readonly page: Page;
  private _loginPage?: LoginPage;

  constructor(page: Page) {
    this.page = page;
  }

  get loginPage(): LoginPage {
    this._loginPage ??= new LoginPage(this.page);
    return this._loginPage;
  }
}
