/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FamiliesComponentsPage, FamiliesDeleteDialog, FamiliesUpdatePage } from './families.page-object';

const expect = chai.expect;

describe('Families e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let familiesUpdatePage: FamiliesUpdatePage;
  let familiesComponentsPage: FamiliesComponentsPage;
  let familiesDeleteDialog: FamiliesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Families', async () => {
    await navBarPage.goToEntity('families');
    familiesComponentsPage = new FamiliesComponentsPage();
    await browser.wait(ec.visibilityOf(familiesComponentsPage.title), 5000);
    expect(await familiesComponentsPage.getTitle()).to.eq('Families');
  });

  it('should load create Families page', async () => {
    await familiesComponentsPage.clickOnCreateButton();
    familiesUpdatePage = new FamiliesUpdatePage();
    expect(await familiesUpdatePage.getPageTitle()).to.eq('Create or edit a Families');
    await familiesUpdatePage.cancel();
  });

  it('should create and save Families', async () => {
    const nbButtonsBeforeCreate = await familiesComponentsPage.countDeleteButtons();

    await familiesComponentsPage.clickOnCreateButton();
    await promise.all([
      familiesUpdatePage.setFamilyNameInput('familyName'),
      familiesUpdatePage.setFamilyImageInput('familyImage'),
      familiesUpdatePage.setFamilyIconInput('familyIcon'),
      familiesUpdatePage.linesSelectLastOption()
    ]);
    expect(await familiesUpdatePage.getFamilyNameInput()).to.eq('familyName', 'Expected FamilyName value to be equals to familyName');
    expect(await familiesUpdatePage.getFamilyImageInput()).to.eq('familyImage', 'Expected FamilyImage value to be equals to familyImage');
    expect(await familiesUpdatePage.getFamilyIconInput()).to.eq('familyIcon', 'Expected FamilyIcon value to be equals to familyIcon');
    await familiesUpdatePage.save();
    expect(await familiesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await familiesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Families', async () => {
    const nbButtonsBeforeDelete = await familiesComponentsPage.countDeleteButtons();
    await familiesComponentsPage.clickOnLastDeleteButton();

    familiesDeleteDialog = new FamiliesDeleteDialog();
    expect(await familiesDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Families?');
    await familiesDeleteDialog.clickOnConfirmButton();

    expect(await familiesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
