/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SteeringComponentsPage, SteeringDeleteDialog, SteeringUpdatePage } from './steering.page-object';

const expect = chai.expect;

describe('Steering e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let steeringUpdatePage: SteeringUpdatePage;
  let steeringComponentsPage: SteeringComponentsPage;
  let steeringDeleteDialog: SteeringDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Steerings', async () => {
    await navBarPage.goToEntity('steering');
    steeringComponentsPage = new SteeringComponentsPage();
    await browser.wait(ec.visibilityOf(steeringComponentsPage.title), 5000);
    expect(await steeringComponentsPage.getTitle()).to.eq('Steerings');
  });

  it('should load create Steering page', async () => {
    await steeringComponentsPage.clickOnCreateButton();
    steeringUpdatePage = new SteeringUpdatePage();
    expect(await steeringUpdatePage.getPageTitle()).to.eq('Create or edit a Steering');
    await steeringUpdatePage.cancel();
  });

  it('should create and save Steerings', async () => {
    const nbButtonsBeforeCreate = await steeringComponentsPage.countDeleteButtons();

    await steeringComponentsPage.clickOnCreateButton();
    await promise.all([steeringUpdatePage.setSteeringNameInput('steeringName'), steeringUpdatePage.setSteeringImageInput('steeringImage')]);
    expect(await steeringUpdatePage.getSteeringNameInput()).to.eq(
      'steeringName',
      'Expected SteeringName value to be equals to steeringName'
    );
    expect(await steeringUpdatePage.getSteeringImageInput()).to.eq(
      'steeringImage',
      'Expected SteeringImage value to be equals to steeringImage'
    );
    await steeringUpdatePage.save();
    expect(await steeringUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await steeringComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Steering', async () => {
    const nbButtonsBeforeDelete = await steeringComponentsPage.countDeleteButtons();
    await steeringComponentsPage.clickOnLastDeleteButton();

    steeringDeleteDialog = new SteeringDeleteDialog();
    expect(await steeringDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Steering?');
    await steeringDeleteDialog.clickOnConfirmButton();

    expect(await steeringComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
