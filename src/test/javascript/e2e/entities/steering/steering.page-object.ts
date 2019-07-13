import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class SteeringComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-steering div table .btn-danger'));
  title = element.all(by.css('jhi-steering div h2#page-heading span')).first();

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

export class SteeringUpdatePage {
  pageTitle = element(by.id('jhi-steering-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  steeringNameInput = element(by.id('field_steeringName'));
  steeringImageInput = element(by.id('field_steeringImage'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setSteeringNameInput(steeringName) {
    await this.steeringNameInput.sendKeys(steeringName);
  }

  async getSteeringNameInput() {
    return await this.steeringNameInput.getAttribute('value');
  }

  async setSteeringImageInput(steeringImage) {
    await this.steeringImageInput.sendKeys(steeringImage);
  }

  async getSteeringImageInput() {
    return await this.steeringImageInput.getAttribute('value');
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

export class SteeringDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-steering-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-steering'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
