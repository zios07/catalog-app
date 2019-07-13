import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class VehicleModelsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-vehicle-models div table .btn-danger'));
  title = element.all(by.css('jhi-vehicle-models div h2#page-heading span')).first();

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

export class VehicleModelsUpdatePage {
  pageTitle = element(by.id('jhi-vehicle-models-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  vehicleModelInput = element(by.id('field_vehicleModel'));
  startProductionInput = element(by.id('field_startProduction'));
  finishProductionInput = element(by.id('field_finishProduction'));
  startChassiInput = element(by.id('field_startChassi'));
  fineshChassiInput = element(by.id('field_fineshChassi'));
  codeInput = element(by.id('field_code'));
  fleetQuantityInput = element(by.id('field_fleetQuantity'));
  vehiclesSelect = element(by.id('field_vehicles'));
  motorsSelect = element(by.id('field_motors'));
  transmissionSelect = element(by.id('field_transmission'));
  steeringSelect = element(by.id('field_steering'));
  nationalitiesSelect = element(by.id('field_nationalities'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setVehicleModelInput(vehicleModel) {
    await this.vehicleModelInput.sendKeys(vehicleModel);
  }

  async getVehicleModelInput() {
    return await this.vehicleModelInput.getAttribute('value');
  }

  async setStartProductionInput(startProduction) {
    await this.startProductionInput.sendKeys(startProduction);
  }

  async getStartProductionInput() {
    return await this.startProductionInput.getAttribute('value');
  }

  async setFinishProductionInput(finishProduction) {
    await this.finishProductionInput.sendKeys(finishProduction);
  }

  async getFinishProductionInput() {
    return await this.finishProductionInput.getAttribute('value');
  }

  async setStartChassiInput(startChassi) {
    await this.startChassiInput.sendKeys(startChassi);
  }

  async getStartChassiInput() {
    return await this.startChassiInput.getAttribute('value');
  }

  async setFineshChassiInput(fineshChassi) {
    await this.fineshChassiInput.sendKeys(fineshChassi);
  }

  async getFineshChassiInput() {
    return await this.fineshChassiInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setFleetQuantityInput(fleetQuantity) {
    await this.fleetQuantityInput.sendKeys(fleetQuantity);
  }

  async getFleetQuantityInput() {
    return await this.fleetQuantityInput.getAttribute('value');
  }

  async vehiclesSelectLastOption(timeout?: number) {
    await this.vehiclesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async vehiclesSelectOption(option) {
    await this.vehiclesSelect.sendKeys(option);
  }

  getVehiclesSelect(): ElementFinder {
    return this.vehiclesSelect;
  }

  async getVehiclesSelectedOption() {
    return await this.vehiclesSelect.element(by.css('option:checked')).getText();
  }

  async motorsSelectLastOption(timeout?: number) {
    await this.motorsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async motorsSelectOption(option) {
    await this.motorsSelect.sendKeys(option);
  }

  getMotorsSelect(): ElementFinder {
    return this.motorsSelect;
  }

  async getMotorsSelectedOption() {
    return await this.motorsSelect.element(by.css('option:checked')).getText();
  }

  async transmissionSelectLastOption(timeout?: number) {
    await this.transmissionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async transmissionSelectOption(option) {
    await this.transmissionSelect.sendKeys(option);
  }

  getTransmissionSelect(): ElementFinder {
    return this.transmissionSelect;
  }

  async getTransmissionSelectedOption() {
    return await this.transmissionSelect.element(by.css('option:checked')).getText();
  }

  async steeringSelectLastOption(timeout?: number) {
    await this.steeringSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async steeringSelectOption(option) {
    await this.steeringSelect.sendKeys(option);
  }

  getSteeringSelect(): ElementFinder {
    return this.steeringSelect;
  }

  async getSteeringSelectedOption() {
    return await this.steeringSelect.element(by.css('option:checked')).getText();
  }

  async nationalitiesSelectLastOption(timeout?: number) {
    await this.nationalitiesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nationalitiesSelectOption(option) {
    await this.nationalitiesSelect.sendKeys(option);
  }

  getNationalitiesSelect(): ElementFinder {
    return this.nationalitiesSelect;
  }

  async getNationalitiesSelectedOption() {
    return await this.nationalitiesSelect.element(by.css('option:checked')).getText();
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

export class VehicleModelsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-vehicleModels-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleModels'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
