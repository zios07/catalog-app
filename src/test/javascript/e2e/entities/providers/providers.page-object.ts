import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ProvidersComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-providers div table .btn-danger'));
  title = element.all(by.css('jhi-providers div h2#page-heading span')).first();

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

export class ProvidersUpdatePage {
  pageTitle = element(by.id('jhi-providers-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  providerNameInput = element(by.id('field_providerName'));
  manufacturerInput = element(by.id('field_manufacturer'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setProviderNameInput(providerName) {
    await this.providerNameInput.sendKeys(providerName);
  }

  async getProviderNameInput() {
    return await this.providerNameInput.getAttribute('value');
  }

  getManufacturerInput(timeout?: number) {
    return this.manufacturerInput;
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

export class ProvidersDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-providers-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-providers'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
