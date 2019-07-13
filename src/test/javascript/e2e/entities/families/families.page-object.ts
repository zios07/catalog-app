import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class FamiliesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-families div table .btn-danger'));
  title = element.all(by.css('jhi-families div h2#page-heading span')).first();

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

export class FamiliesUpdatePage {
  pageTitle = element(by.id('jhi-families-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  familyNameInput = element(by.id('field_familyName'));
  familyImageInput = element(by.id('field_familyImage'));
  familyIconInput = element(by.id('field_familyIcon'));
  linesSelect = element(by.id('field_lines'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setFamilyNameInput(familyName) {
    await this.familyNameInput.sendKeys(familyName);
  }

  async getFamilyNameInput() {
    return await this.familyNameInput.getAttribute('value');
  }

  async setFamilyImageInput(familyImage) {
    await this.familyImageInput.sendKeys(familyImage);
  }

  async getFamilyImageInput() {
    return await this.familyImageInput.getAttribute('value');
  }

  async setFamilyIconInput(familyIcon) {
    await this.familyIconInput.sendKeys(familyIcon);
  }

  async getFamilyIconInput() {
    return await this.familyIconInput.getAttribute('value');
  }

  async linesSelectLastOption(timeout?: number) {
    await this.linesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async linesSelectOption(option) {
    await this.linesSelect.sendKeys(option);
  }

  getLinesSelect(): ElementFinder {
    return this.linesSelect;
  }

  async getLinesSelectedOption() {
    return await this.linesSelect.element(by.css('option:checked')).getText();
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

export class FamiliesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-families-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-families'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
