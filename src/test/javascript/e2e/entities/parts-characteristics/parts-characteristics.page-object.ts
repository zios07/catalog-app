import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PartsCharacteristicsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-parts-characteristics div table .btn-danger'));
  title = element.all(by.css('jhi-parts-characteristics div h2#page-heading span')).first();

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

export class PartsCharacteristicsUpdatePage {
  pageTitle = element(by.id('jhi-parts-characteristics-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  informationInput = element(by.id('field_information'));
  partsSelect = element(by.id('field_parts'));
  characteristicsSelect = element(by.id('field_characteristics'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setInformationInput(information) {
    await this.informationInput.sendKeys(information);
  }

  async getInformationInput() {
    return await this.informationInput.getAttribute('value');
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

  async characteristicsSelectLastOption(timeout?: number) {
    await this.characteristicsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async characteristicsSelectOption(option) {
    await this.characteristicsSelect.sendKeys(option);
  }

  getCharacteristicsSelect(): ElementFinder {
    return this.characteristicsSelect;
  }

  async getCharacteristicsSelectedOption() {
    return await this.characteristicsSelect.element(by.css('option:checked')).getText();
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

export class PartsCharacteristicsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-partsCharacteristics-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-partsCharacteristics'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
