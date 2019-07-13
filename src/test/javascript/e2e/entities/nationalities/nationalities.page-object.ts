import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class NationalitiesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-nationalities div table .btn-danger'));
  title = element.all(by.css('jhi-nationalities div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class NationalitiesUpdatePage {
  pageTitle = element(by.id('jhi-nationalities-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nationalityNameInput = element(by.id('field_nationalityName'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setNationalityNameInput(nationalityName) {
    await this.nationalityNameInput.sendKeys(nationalityName);
  }

  async getNationalityNameInput() {
    return await this.nationalityNameInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class NationalitiesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-nationalities-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-nationalities'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
