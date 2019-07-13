/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProvidersComponentsPage, ProvidersDeleteDialog, ProvidersUpdatePage } from './providers.page-object';

const expect = chai.expect;

describe('Providers e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let providersUpdatePage: ProvidersUpdatePage;
  let providersComponentsPage: ProvidersComponentsPage;
  let providersDeleteDialog: ProvidersDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Providers', async () => {
    await navBarPage.goToEntity('providers');
    providersComponentsPage = new ProvidersComponentsPage();
    await browser.wait(ec.visibilityOf(providersComponentsPage.title), 5000);
    expect(await providersComponentsPage.getTitle()).to.eq('Providers');
  });

  it('should load create Providers page', async () => {
    await providersComponentsPage.clickOnCreateButton();
    providersUpdatePage = new ProvidersUpdatePage();
    expect(await providersUpdatePage.getPageTitle()).to.eq('Create or edit a Providers');
    await providersUpdatePage.cancel();
  });

  it('should create and save Providers', async () => {
    const nbButtonsBeforeCreate = await providersComponentsPage.countDeleteButtons();

    await providersComponentsPage.clickOnCreateButton();
    await promise.all([providersUpdatePage.setProviderNameInput('providerName')]);
    expect(await providersUpdatePage.getProviderNameInput()).to.eq(
      'providerName',
      'Expected ProviderName value to be equals to providerName'
    );
    const selectedManufacturer = providersUpdatePage.getManufacturerInput();
    if (await selectedManufacturer.isSelected()) {
      await providersUpdatePage.getManufacturerInput().click();
      expect(await providersUpdatePage.getManufacturerInput().isSelected(), 'Expected manufacturer not to be selected').to.be.false;
    } else {
      await providersUpdatePage.getManufacturerInput().click();
      expect(await providersUpdatePage.getManufacturerInput().isSelected(), 'Expected manufacturer to be selected').to.be.true;
    }
    await providersUpdatePage.save();
    expect(await providersUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await providersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Providers', async () => {
    const nbButtonsBeforeDelete = await providersComponentsPage.countDeleteButtons();
    await providersComponentsPage.clickOnLastDeleteButton();

    providersDeleteDialog = new ProvidersDeleteDialog();
    expect(await providersDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Providers?');
    await providersDeleteDialog.clickOnConfirmButton();

    expect(await providersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
