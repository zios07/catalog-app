import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class TransmissionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-transmission div table .btn-danger'));
  title = element.all(by.css('jhi-transmission div h2#page-heading span')).first();

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

export class TransmissionUpdatePage {
  pageTitle = element(by.id('jhi-transmission-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  transmissionNameInput = element(by.id('field_transmissionName'));
  transmissaoImageInput = element(by.id('field_transmissaoImage'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setTransmissionNameInput(transmissionName) {
    await this.transmissionNameInput.sendKeys(transmissionName);
  }

  async getTransmissionNameInput() {
    return await this.transmissionNameInput.getAttribute('value');
  }

  async setTransmissaoImageInput(transmissaoImage) {
    await this.transmissaoImageInput.sendKeys(transmissaoImage);
  }

  async getTransmissaoImageInput() {
    return await this.transmissaoImageInput.getAttribute('value');
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

export class TransmissionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-transmission-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-transmission'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
