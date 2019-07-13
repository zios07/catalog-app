/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TransmissionComponentsPage, TransmissionDeleteDialog, TransmissionUpdatePage } from './transmission.page-object';

const expect = chai.expect;

describe('Transmission e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transmissionUpdatePage: TransmissionUpdatePage;
  let transmissionComponentsPage: TransmissionComponentsPage;
  let transmissionDeleteDialog: TransmissionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Transmissions', async () => {
    await navBarPage.goToEntity('transmission');
    transmissionComponentsPage = new TransmissionComponentsPage();
    await browser.wait(ec.visibilityOf(transmissionComponentsPage.title), 5000);
    expect(await transmissionComponentsPage.getTitle()).to.eq('Transmissions');
  });

  it('should load create Transmission page', async () => {
    await transmissionComponentsPage.clickOnCreateButton();
    transmissionUpdatePage = new TransmissionUpdatePage();
    expect(await transmissionUpdatePage.getPageTitle()).to.eq('Create or edit a Transmission');
    await transmissionUpdatePage.cancel();
  });

  it('should create and save Transmissions', async () => {
    const nbButtonsBeforeCreate = await transmissionComponentsPage.countDeleteButtons();

    await transmissionComponentsPage.clickOnCreateButton();
    await promise.all([
      transmissionUpdatePage.setTransmissionNameInput('transmissionName'),
      transmissionUpdatePage.setTransmissaoImageInput('transmissaoImage')
    ]);
    expect(await transmissionUpdatePage.getTransmissionNameInput()).to.eq(
      'transmissionName',
      'Expected TransmissionName value to be equals to transmissionName'
    );
    expect(await transmissionUpdatePage.getTransmissaoImageInput()).to.eq(
      'transmissaoImage',
      'Expected TransmissaoImage value to be equals to transmissaoImage'
    );
    await transmissionUpdatePage.save();
    expect(await transmissionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await transmissionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Transmission', async () => {
    const nbButtonsBeforeDelete = await transmissionComponentsPage.countDeleteButtons();
    await transmissionComponentsPage.clickOnLastDeleteButton();

    transmissionDeleteDialog = new TransmissionDeleteDialog();
    expect(await transmissionDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Transmission?');
    await transmissionDeleteDialog.clickOnConfirmButton();

    expect(await transmissionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
