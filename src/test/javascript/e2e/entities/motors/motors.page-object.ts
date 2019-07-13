import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MotorsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-motors div table .btn-danger'));
  title = element.all(by.css('jhi-motors div h2#page-heading span')).first();

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

export class MotorsUpdatePage {
  pageTitle = element(by.id('jhi-motors-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  motorNameInput = element(by.id('field_motorName'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setMotorNameInput(motorName) {
    await this.motorNameInput.sendKeys(motorName);
  }

  async getMotorNameInput() {
    return await this.motorNameInput.getAttribute('value');
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

export class MotorsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-motors-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-motors'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
