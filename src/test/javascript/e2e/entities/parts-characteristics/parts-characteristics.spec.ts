/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  PartsCharacteristicsComponentsPage,
  PartsCharacteristicsDeleteDialog,
  PartsCharacteristicsUpdatePage
} from './parts-characteristics.page-object';

const expect = chai.expect;

describe('PartsCharacteristics e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let partsCharacteristicsUpdatePage: PartsCharacteristicsUpdatePage;
  let partsCharacteristicsComponentsPage: PartsCharacteristicsComponentsPage;
  let partsCharacteristicsDeleteDialog: PartsCharacteristicsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PartsCharacteristics', async () => {
    await navBarPage.goToEntity('parts-characteristics');
    partsCharacteristicsComponentsPage = new PartsCharacteristicsComponentsPage();
    await browser.wait(ec.visibilityOf(partsCharacteristicsComponentsPage.title), 5000);
    expect(await partsCharacteristicsComponentsPage.getTitle()).to.eq('Parts Characteristics');
  });

  it('should load create PartsCharacteristics page', async () => {
    await partsCharacteristicsComponentsPage.clickOnCreateButton();
    partsCharacteristicsUpdatePage = new PartsCharacteristicsUpdatePage();
    expect(await partsCharacteristicsUpdatePage.getPageTitle()).to.eq('Create or edit a Parts Characteristics');
    await partsCharacteristicsUpdatePage.cancel();
  });

  it('should create and save PartsCharacteristics', async () => {
    const nbButtonsBeforeCreate = await partsCharacteristicsComponentsPage.countDeleteButtons();

    await partsCharacteristicsComponentsPage.clickOnCreateButton();
    await promise.all([
      partsCharacteristicsUpdatePage.setInformationInput('information'),
      partsCharacteristicsUpdatePage.partsSelectLastOption(),
      partsCharacteristicsUpdatePage.characteristicsSelectLastOption()
    ]);
    expect(await partsCharacteristicsUpdatePage.getInformationInput()).to.eq(
      'information',
      'Expected Information value to be equals to information'
    );
    await partsCharacteristicsUpdatePage.save();
    expect(await partsCharacteristicsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await partsCharacteristicsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PartsCharacteristics', async () => {
    const nbButtonsBeforeDelete = await partsCharacteristicsComponentsPage.countDeleteButtons();
    await partsCharacteristicsComponentsPage.clickOnLastDeleteButton();

    partsCharacteristicsDeleteDialog = new PartsCharacteristicsDeleteDialog();
    expect(await partsCharacteristicsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Parts Characteristics?');
    await partsCharacteristicsDeleteDialog.clickOnConfirmButton();

    expect(await partsCharacteristicsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
