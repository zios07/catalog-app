import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class VehicleBrandsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-vehicle-brands div table .btn-danger'));
  title = element.all(by.css('jhi-vehicle-brands div h2#page-heading span')).first();

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

export class VehicleBrandsUpdatePage {
  pageTitle = element(by.id('jhi-vehicle-brands-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  vehicleBrandNameInput = element(by.id('field_vehicleBrandName'));
  vehicleBrandImageInput = element(by.id('field_vehicleBrandImage'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setVehicleBrandNameInput(vehicleBrandName) {
    await this.vehicleBrandNameInput.sendKeys(vehicleBrandName);
  }

  async getVehicleBrandNameInput() {
    return await this.vehicleBrandNameInput.getAttribute('value');
  }

  async setVehicleBrandImageInput(vehicleBrandImage) {
    await this.vehicleBrandImageInput.sendKeys(vehicleBrandImage);
  }

  async getVehicleBrandImageInput() {
    return await this.vehicleBrandImageInput.getAttribute('value');
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

export class VehicleBrandsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-vehicleBrands-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleBrands'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
