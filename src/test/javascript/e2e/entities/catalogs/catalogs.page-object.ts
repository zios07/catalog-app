import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CatalogsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-catalogs div table .btn-danger'));
  title = element.all(by.css('jhi-catalogs div h2#page-heading span')).first();

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

export class CatalogsUpdatePage {
  pageTitle = element(by.id('jhi-catalogs-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  catalogNameInput = element(by.id('field_catalogName'));
  catalogoImagemCover1Input = element(by.id('field_catalogoImagemCover1'));
  catalogoImagemCover2Input = element(by.id('field_catalogoImagemCover2'));
  catalogoImagemCover3Input = element(by.id('field_catalogoImagemCover3'));
  catalogoImagemCover4Input = element(by.id('field_catalogoImagemCover4'));
  userSelect = element(by.id('field_user'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setCatalogNameInput(catalogName) {
    await this.catalogNameInput.sendKeys(catalogName);
  }

  async getCatalogNameInput() {
    return await this.catalogNameInput.getAttribute('value');
  }

  async setCatalogoImagemCover1Input(catalogoImagemCover1) {
    await this.catalogoImagemCover1Input.sendKeys(catalogoImagemCover1);
  }

  async getCatalogoImagemCover1Input() {
    return await this.catalogoImagemCover1Input.getAttribute('value');
  }

  async setCatalogoImagemCover2Input(catalogoImagemCover2) {
    await this.catalogoImagemCover2Input.sendKeys(catalogoImagemCover2);
  }

  async getCatalogoImagemCover2Input() {
    return await this.catalogoImagemCover2Input.getAttribute('value');
  }

  async setCatalogoImagemCover3Input(catalogoImagemCover3) {
    await this.catalogoImagemCover3Input.sendKeys(catalogoImagemCover3);
  }

  async getCatalogoImagemCover3Input() {
    return await this.catalogoImagemCover3Input.getAttribute('value');
  }

  async setCatalogoImagemCover4Input(catalogoImagemCover4) {
    await this.catalogoImagemCover4Input.sendKeys(catalogoImagemCover4);
  }

  async getCatalogoImagemCover4Input() {
    return await this.catalogoImagemCover4Input.getAttribute('value');
  }

  async userSelectLastOption(timeout?: number) {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class CatalogsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-catalogs-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-catalogs'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
