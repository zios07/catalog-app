/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VehiclesComponentsPage, VehiclesDeleteDialog, VehiclesUpdatePage } from './vehicles.page-object';

const expect = chai.expect;

describe('Vehicles e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehiclesUpdatePage: VehiclesUpdatePage;
  let vehiclesComponentsPage: VehiclesComponentsPage;
  let vehiclesDeleteDialog: VehiclesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Vehicles', async () => {
    await navBarPage.goToEntity('vehicles');
    vehiclesComponentsPage = new VehiclesComponentsPage();
    await browser.wait(ec.visibilityOf(vehiclesComponentsPage.title), 5000);
    expect(await vehiclesComponentsPage.getTitle()).to.eq('Vehicles');
  });

  it('should load create Vehicles page', async () => {
    await vehiclesComponentsPage.clickOnCreateButton();
    vehiclesUpdatePage = new VehiclesUpdatePage();
    expect(await vehiclesUpdatePage.getPageTitle()).to.eq('Create or edit a Vehicles');
    await vehiclesUpdatePage.cancel();
  });

  it('should create and save Vehicles', async () => {
    const nbButtonsBeforeCreate = await vehiclesComponentsPage.countDeleteButtons();

    await vehiclesComponentsPage.clickOnCreateButton();
    await promise.all([
      vehiclesUpdatePage.setVehicleInput('vehicle'),
      vehiclesUpdatePage.setCodeInput('code'),
      vehiclesUpdatePage.vehicleBrandsSelectLastOption()
    ]);
    expect(await vehiclesUpdatePage.getVehicleInput()).to.eq('vehicle', 'Expected Vehicle value to be equals to vehicle');
    expect(await vehiclesUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    await vehiclesUpdatePage.save();
    expect(await vehiclesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await vehiclesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Vehicles', async () => {
    const nbButtonsBeforeDelete = await vehiclesComponentsPage.countDeleteButtons();
    await vehiclesComponentsPage.clickOnLastDeleteButton();

    vehiclesDeleteDialog = new VehiclesDeleteDialog();
    expect(await vehiclesDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Vehicles?');
    await vehiclesDeleteDialog.clickOnConfirmButton();

    expect(await vehiclesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
