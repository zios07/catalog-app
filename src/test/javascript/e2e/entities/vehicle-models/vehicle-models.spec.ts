/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VehicleModelsComponentsPage, VehicleModelsDeleteDialog, VehicleModelsUpdatePage } from './vehicle-models.page-object';

const expect = chai.expect;

describe('VehicleModels e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleModelsUpdatePage: VehicleModelsUpdatePage;
  let vehicleModelsComponentsPage: VehicleModelsComponentsPage;
  let vehicleModelsDeleteDialog: VehicleModelsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load VehicleModels', async () => {
    await navBarPage.goToEntity('vehicle-models');
    vehicleModelsComponentsPage = new VehicleModelsComponentsPage();
    await browser.wait(ec.visibilityOf(vehicleModelsComponentsPage.title), 5000);
    expect(await vehicleModelsComponentsPage.getTitle()).to.eq('Vehicle Models');
  });

  it('should load create VehicleModels page', async () => {
    await vehicleModelsComponentsPage.clickOnCreateButton();
    vehicleModelsUpdatePage = new VehicleModelsUpdatePage();
    expect(await vehicleModelsUpdatePage.getPageTitle()).to.eq('Create or edit a Vehicle Models');
    await vehicleModelsUpdatePage.cancel();
  });

  it('should create and save VehicleModels', async () => {
    const nbButtonsBeforeCreate = await vehicleModelsComponentsPage.countDeleteButtons();

    await vehicleModelsComponentsPage.clickOnCreateButton();
    await promise.all([
      vehicleModelsUpdatePage.setVehicleModelInput('vehicleModel'),
      vehicleModelsUpdatePage.setStartProductionInput('2000-12-31'),
      vehicleModelsUpdatePage.setFinishProductionInput('2000-12-31'),
      vehicleModelsUpdatePage.setStartChassiInput('startChassi'),
      vehicleModelsUpdatePage.setFineshChassiInput('fineshChassi'),
      vehicleModelsUpdatePage.setCodeInput('code'),
      vehicleModelsUpdatePage.setFleetQuantityInput('5'),
      vehicleModelsUpdatePage.vehiclesSelectLastOption(),
      vehicleModelsUpdatePage.motorsSelectLastOption(),
      vehicleModelsUpdatePage.transmissionSelectLastOption(),
      vehicleModelsUpdatePage.steeringSelectLastOption(),
      vehicleModelsUpdatePage.nationalitiesSelectLastOption()
    ]);
    expect(await vehicleModelsUpdatePage.getVehicleModelInput()).to.eq(
      'vehicleModel',
      'Expected VehicleModel value to be equals to vehicleModel'
    );
    expect(await vehicleModelsUpdatePage.getStartProductionInput()).to.eq(
      '2000-12-31',
      'Expected startProduction value to be equals to 2000-12-31'
    );
    expect(await vehicleModelsUpdatePage.getFinishProductionInput()).to.eq(
      '2000-12-31',
      'Expected finishProduction value to be equals to 2000-12-31'
    );
    expect(await vehicleModelsUpdatePage.getStartChassiInput()).to.eq(
      'startChassi',
      'Expected StartChassi value to be equals to startChassi'
    );
    expect(await vehicleModelsUpdatePage.getFineshChassiInput()).to.eq(
      'fineshChassi',
      'Expected FineshChassi value to be equals to fineshChassi'
    );
    expect(await vehicleModelsUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await vehicleModelsUpdatePage.getFleetQuantityInput()).to.eq('5', 'Expected fleetQuantity value to be equals to 5');
    await vehicleModelsUpdatePage.save();
    expect(await vehicleModelsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await vehicleModelsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last VehicleModels', async () => {
    const nbButtonsBeforeDelete = await vehicleModelsComponentsPage.countDeleteButtons();
    await vehicleModelsComponentsPage.clickOnLastDeleteButton();

    vehicleModelsDeleteDialog = new VehicleModelsDeleteDialog();
    expect(await vehicleModelsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Vehicle Models?');
    await vehicleModelsDeleteDialog.clickOnConfirmButton();

    expect(await vehicleModelsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
