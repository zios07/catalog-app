import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class LinesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-lines div table .btn-danger'));
  title = element.all(by.css('jhi-lines div h2#page-heading span')).first();

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

export class LinesUpdatePage {
  pageTitle = element(by.id('jhi-lines-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  lineNameInput = element(by.id('field_lineName'));
  lineImageInput = element(by.id('field_lineImage'));
  lineIconInput = element(by.id('field_lineIcon'));
  catalogsSelect = element(by.id('field_catalogs'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setLineNameInput(lineName) {
    await this.lineNameInput.sendKeys(lineName);
  }

  async getLineNameInput() {
    return await this.lineNameInput.getAttribute('value');
  }

  async setLineImageInput(lineImage) {
    await this.lineImageInput.sendKeys(lineImage);
  }

  async getLineImageInput() {
    return await this.lineImageInput.getAttribute('value');
  }

  async setLineIconInput(lineIcon) {
    await this.lineIconInput.sendKeys(lineIcon);
  }

  async getLineIconInput() {
    return await this.lineIconInput.getAttribute('value');
  }

  async catalogsSelectLastOption(timeout?: number) {
    await this.catalogsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async catalogsSelectOption(option) {
    await this.catalogsSelect.sendKeys(option);
  }

  getCatalogsSelect(): ElementFinder {
    return this.catalogsSelect;
  }

  async getCatalogsSelectedOption() {
    return await this.catalogsSelect.element(by.css('option:checked')).getText();
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

export class LinesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-lines-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-lines'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
