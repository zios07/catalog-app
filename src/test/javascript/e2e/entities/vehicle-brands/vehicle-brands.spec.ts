/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VehicleBrandsComponentsPage, VehicleBrandsDeleteDialog, VehicleBrandsUpdatePage } from './vehicle-brands.page-object';

const expect = chai.expect;

describe('VehicleBrands e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleBrandsUpdatePage: VehicleBrandsUpdatePage;
  let vehicleBrandsComponentsPage: VehicleBrandsComponentsPage;
  let vehicleBrandsDeleteDialog: VehicleBrandsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load VehicleBrands', async () => {
    await navBarPage.goToEntity('vehicle-brands');
    vehicleBrandsComponentsPage = new VehicleBrandsComponentsPage();
    await browser.wait(ec.visibilityOf(vehicleBrandsComponentsPage.title), 5000);
    expect(await vehicleBrandsComponentsPage.getTitle()).to.eq('Vehicle Brands');
  });

  it('should load create VehicleBrands page', async () => {
    await vehicleBrandsComponentsPage.clickOnCreateButton();
    vehicleBrandsUpdatePage = new VehicleBrandsUpdatePage();
    expect(await vehicleBrandsUpdatePage.getPageTitle()).to.eq('Create or edit a Vehicle Brands');
    await vehicleBrandsUpdatePage.cancel();
  });

  it('should create and save VehicleBrands', async () => {
    const nbButtonsBeforeCreate = await vehicleBrandsComponentsPage.countDeleteButtons();

    await vehicleBrandsComponentsPage.clickOnCreateButton();
    await promise.all([
      vehicleBrandsUpdatePage.setVehicleBrandNameInput('vehicleBrandName'),
      vehicleBrandsUpdatePage.setVehicleBrandImageInput('vehicleBrandImage')
    ]);
    expect(await vehicleBrandsUpdatePage.getVehicleBrandNameInput()).to.eq(
      'vehicleBrandName',
      'Expected VehicleBrandName value to be equals to vehicleBrandName'
    );
    expect(await vehicleBrandsUpdatePage.getVehicleBrandImageInput()).to.eq(
      'vehicleBrandImage',
      'Expected VehicleBrandImage value to be equals to vehicleBrandImage'
    );
    await vehicleBrandsUpdatePage.save();
    expect(await vehicleBrandsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await vehicleBrandsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last VehicleBrands', async () => {
    const nbButtonsBeforeDelete = await vehicleBrandsComponentsPage.countDeleteButtons();
    await vehicleBrandsComponentsPage.clickOnLastDeleteButton();

    vehicleBrandsDeleteDialog = new VehicleBrandsDeleteDialog();
    expect(await vehicleBrandsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Vehicle Brands?');
    await vehicleBrandsDeleteDialog.clickOnConfirmButton();

    expect(await vehicleBrandsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
