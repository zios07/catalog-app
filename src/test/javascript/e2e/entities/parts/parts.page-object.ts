import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PartsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-parts div table .btn-danger'));
  title = element.all(by.css('jhi-parts div h2#page-heading span')).first();

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

export class PartsUpdatePage {
  pageTitle = element(by.id('jhi-parts-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codePartsInput = element(by.id('field_codeParts'));
  partsNameInput = element(by.id('field_partsName'));
  partImageLinkPic360Input = element(by.id('field_partImageLinkPic360'));
  partVideoInput = element(by.id('field_partVideo'));
  partTechnicalManualInput = element(by.id('field_partTechnicalManual'));
  underDevelopmentInput = element(by.id('field_underDevelopment'));
  inactiveInput = element(by.id('field_inactive'));
  eanInput = element(by.id('field_ean'));
  skuInput = element(by.id('field_sku'));
  vehicleModelsSelect = element(by.id('field_vehicleModels'));
  familiesSelect = element(by.id('field_families'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setCodePartsInput(codeParts) {
    await this.codePartsInput.sendKeys(codeParts);
  }

  async getCodePartsInput() {
    return await this.codePartsInput.getAttribute('value');
  }

  async setPartsNameInput(partsName) {
    await this.partsNameInput.sendKeys(partsName);
  }

  async getPartsNameInput() {
    return await this.partsNameInput.getAttribute('value');
  }

  async setPartImageLinkPic360Input(partImageLinkPic360) {
    await this.partImageLinkPic360Input.sendKeys(partImageLinkPic360);
  }

  async getPartImageLinkPic360Input() {
    return await this.partImageLinkPic360Input.getAttribute('value');
  }

  async setPartVideoInput(partVideo) {
    await this.partVideoInput.sendKeys(partVideo);
  }

  async getPartVideoInput() {
    return await this.partVideoInput.getAttribute('value');
  }

  async setPartTechnicalManualInput(partTechnicalManual) {
    await this.partTechnicalManualInput.sendKeys(partTechnicalManual);
  }

  async getPartTechnicalManualInput() {
    return await this.partTechnicalManualInput.getAttribute('value');
  }

  getUnderDevelopmentInput(timeout?: number) {
    return this.underDevelopmentInput;
  }
  getInactiveInput(timeout?: number) {
    return this.inactiveInput;
  }
  async setEanInput(ean) {
    await this.eanInput.sendKeys(ean);
  }

  async getEanInput() {
    return await this.eanInput.getAttribute('value');
  }

  async setSkuInput(sku) {
    await this.skuInput.sendKeys(sku);
  }

  async getSkuInput() {
    return await this.skuInput.getAttribute('value');
  }

  async vehicleModelsSelectLastOption(timeout?: number) {
    await this.vehicleModelsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async vehicleModelsSelectOption(option) {
    await this.vehicleModelsSelect.sendKeys(option);
  }

  getVehicleModelsSelect(): ElementFinder {
    return this.vehicleModelsSelect;
  }

  async getVehicleModelsSelectedOption() {
    return await this.vehicleModelsSelect.element(by.css('option:checked')).getText();
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

export class PartsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-parts-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-parts'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
