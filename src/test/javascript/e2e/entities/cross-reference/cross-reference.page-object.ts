import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CrossReferenceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cross-reference div table .btn-danger'));
  title = element.all(by.css('jhi-cross-reference div h2#page-heading span')).first();

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

export class CrossReferenceUpdatePage {
  pageTitle = element(by.id('jhi-cross-reference-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInProviderInput = element(by.id('field_codeInProvider'));
  viewCatalogInput = element(by.id('field_viewCatalog'));
  providersSelect = element(by.id('field_providers'));
  partsSelect = element(by.id('field_parts'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setCodeInProviderInput(codeInProvider) {
    await this.codeInProviderInput.sendKeys(codeInProvider);
  }

  async getCodeInProviderInput() {
    return await this.codeInProviderInput.getAttribute('value');
  }

  getViewCatalogInput(timeout?: number) {
    return this.viewCatalogInput;
  }

  async providersSelectLastOption(timeout?: number) {
    await this.providersSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async providersSelectOption(option) {
    await this.providersSelect.sendKeys(option);
  }

  getProvidersSelect(): ElementFinder {
    return this.providersSelect;
  }

  async getProvidersSelectedOption() {
    return await this.providersSelect.element(by.css('option:checked')).getText();
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

export class CrossReferenceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-crossReference-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-crossReference'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
