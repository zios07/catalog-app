import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class VehiclesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-vehicles div table .btn-danger'));
  title = element.all(by.css('jhi-vehicles div h2#page-heading span')).first();

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

export class VehiclesUpdatePage {
  pageTitle = element(by.id('jhi-vehicles-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  vehicleInput = element(by.id('field_vehicle'));
  codeInput = element(by.id('field_code'));
  vehicleBrandsSelect = element(by.id('field_vehicleBrands'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setVehicleInput(vehicle) {
    await this.vehicleInput.sendKeys(vehicle);
  }

  async getVehicleInput() {
    return await this.vehicleInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async vehicleBrandsSelectLastOption(timeout?: number) {
    await this.vehicleBrandsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async vehicleBrandsSelectOption(option) {
    await this.vehicleBrandsSelect.sendKeys(option);
  }

  getVehicleBrandsSelect(): ElementFinder {
    return this.vehicleBrandsSelect;
  }

  async getVehicleBrandsSelectedOption() {
    return await this.vehicleBrandsSelect.element(by.css('option:checked')).getText();
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

export class VehiclesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-vehicles-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicles'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
