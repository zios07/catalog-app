import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PartsImagesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-parts-images div table .btn-danger'));
  title = element.all(by.css('jhi-parts-images div h2#page-heading span')).first();

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

export class PartsImagesUpdatePage {
  pageTitle = element(by.id('jhi-parts-images-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  partImageInput = element(by.id('field_partImage'));
  partsSelect = element(by.id('field_parts'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setPartImageInput(partImage) {
    await this.partImageInput.sendKeys(partImage);
  }

  async getPartImageInput() {
    return await this.partImageInput.getAttribute('value');
  }

  async partsSelectLastOption(timeout?: number) {
    await this.partsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async partsSelectOption(option) {
    await this.partsSelect.sendKeys(option);
  }

  getPartsSelect(): ElementFinder {
    return this.partsSelect;
  }

  async getPartsSelectedOption() {
    return await this.partsSelect.element(by.css('option:checked')).getText();
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

export class PartsImagesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-partsImages-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-partsImages'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
