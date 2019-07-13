import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CharacteristicsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-characteristics div table .btn-danger'));
  title = element.all(by.css('jhi-characteristics div h2#page-heading span')).first();

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

export class CharacteristicsUpdatePage {
  pageTitle = element(by.id('jhi-characteristics-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  characteristicsNameInput = element(by.id('field_characteristicsName'));
  viewCatalogInput = element(by.id('field_viewCatalog'));
  viewSpecialClientInput = element(by.id('field_viewSpecialClient'));
  familiesSelect = element(by.id('field_families'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setCharacteristicsNameInput(characteristicsName) {
    await this.characteristicsNameInput.sendKeys(characteristicsName);
  }

  async getCharacteristicsNameInput() {
    return await this.characteristicsNameInput.getAttribute('value');
  }

  getViewCatalogInput(timeout?: number) {
    return this.viewCatalogInput;
  }
  getViewSpecialClientInput(timeout?: number) {
    return this.viewSpecialClientInput;
  }

  async familiesSelectLastOption(timeout?: number) {
    await this.familiesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async familiesSelectOption(option) {
    await this.familiesSelect.sendKeys(option);
  }

  getFamiliesSelect(): ElementFinder {
    return this.familiesSelect;
  }

  async getFamiliesSelectedOption() {
    return await this.familiesSelect.element(by.css('option:checked')).getText();
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

export class CharacteristicsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-characteristics-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-characteristics'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
