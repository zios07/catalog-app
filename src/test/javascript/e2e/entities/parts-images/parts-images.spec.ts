/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PartsImagesComponentsPage, PartsImagesDeleteDialog, PartsImagesUpdatePage } from './parts-images.page-object';

const expect = chai.expect;

describe('PartsImages e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let partsImagesUpdatePage: PartsImagesUpdatePage;
  let partsImagesComponentsPage: PartsImagesComponentsPage;
  let partsImagesDeleteDialog: PartsImagesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PartsImages', async () => {
    await navBarPage.goToEntity('parts-images');
    partsImagesComponentsPage = new PartsImagesComponentsPage();
    await browser.wait(ec.visibilityOf(partsImagesComponentsPage.title), 5000);
    expect(await partsImagesComponentsPage.getTitle()).to.eq('Parts Images');
  });

  it('should load create PartsImages page', async () => {
    await partsImagesComponentsPage.clickOnCreateButton();
    partsImagesUpdatePage = new PartsImagesUpdatePage();
    expect(await partsImagesUpdatePage.getPageTitle()).to.eq('Create or edit a Parts Images');
    await partsImagesUpdatePage.cancel();
  });

  it('should create and save PartsImages', async () => {
    const nbButtonsBeforeCreate = await partsImagesComponentsPage.countDeleteButtons();

    await partsImagesComponentsPage.clickOnCreateButton();
    await promise.all([partsImagesUpdatePage.setPartImageInput('partImage'), partsImagesUpdatePage.partsSelectLastOption()]);
    expect(await partsImagesUpdatePage.getPartImageInput()).to.eq('partImage', 'Expected PartImage value to be equals to partImage');
    await partsImagesUpdatePage.save();
    expect(await partsImagesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await partsImagesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PartsImages', async () => {
    const nbButtonsBeforeDelete = await partsImagesComponentsPage.countDeleteButtons();
    await partsImagesComponentsPage.clickOnLastDeleteButton();

    partsImagesDeleteDialog = new PartsImagesDeleteDialog();
    expect(await partsImagesDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Parts Images?');
    await partsImagesDeleteDialog.clickOnConfirmButton();

    expect(await partsImagesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
