/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CharacteristicsComponentsPage, CharacteristicsDeleteDialog, CharacteristicsUpdatePage } from './characteristics.page-object';

const expect = chai.expect;

describe('Characteristics e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let characteristicsUpdatePage: CharacteristicsUpdatePage;
  let characteristicsComponentsPage: CharacteristicsComponentsPage;
  let characteristicsDeleteDialog: CharacteristicsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Characteristics', async () => {
    await navBarPage.goToEntity('characteristics');
    characteristicsComponentsPage = new CharacteristicsComponentsPage();
    await browser.wait(ec.visibilityOf(characteristicsComponentsPage.title), 5000);
    expect(await characteristicsComponentsPage.getTitle()).to.eq('Characteristics');
  });

  it('should load create Characteristics page', async () => {
    await characteristicsComponentsPage.clickOnCreateButton();
    characteristicsUpdatePage = new CharacteristicsUpdatePage();
    expect(await characteristicsUpdatePage.getPageTitle()).to.eq('Create or edit a Characteristics');
    await characteristicsUpdatePage.cancel();
  });

  it('should create and save Characteristics', async () => {
    const nbButtonsBeforeCreate = await characteristicsComponentsPage.countDeleteButtons();

    await characteristicsComponentsPage.clickOnCreateButton();
    await promise.all([
      characteristicsUpdatePage.setCharacteristicsNameInput('characteristicsName'),
      characteristicsUpdatePage.familiesSelectLastOption()
    ]);
    expect(await characteristicsUpdatePage.getCharacteristicsNameInput()).to.eq(
      'characteristicsName',
      'Expected CharacteristicsName value to be equals to characteristicsName'
    );
    const selectedViewCatalog = characteristicsUpdatePage.getViewCatalogInput();
    if (await selectedViewCatalog.isSelected()) {
      await characteristicsUpdatePage.getViewCatalogInput().click();
      expect(await characteristicsUpdatePage.getViewCatalogInput().isSelected(), 'Expected viewCatalog not to be selected').to.be.false;
    } else {
      await characteristicsUpdatePage.getViewCatalogInput().click();
      expect(await characteristicsUpdatePage.getViewCatalogInput().isSelected(), 'Expected viewCatalog to be selected').to.be.true;
    }
    const selectedViewSpecialClient = characteristicsUpdatePage.getViewSpecialClientInput();
    if (await selectedViewSpecialClient.isSelected()) {
      await characteristicsUpdatePage.getViewSpecialClientInput().click();
      expect(await characteristicsUpdatePage.getViewSpecialClientInput().isSelected(), 'Expected viewSpecialClient not to be selected').to
        .be.false;
    } else {
      await characteristicsUpdatePage.getViewSpecialClientInput().click();
      expect(await characteristicsUpdatePage.getViewSpecialClientInput().isSelected(), 'Expected viewSpecialClient to be selected').to.be
        .true;
    }
    await characteristicsUpdatePage.save();
    expect(await characteristicsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await characteristicsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last Characteristics', async () => {
    const nbButtonsBeforeDelete = await characteristicsComponentsPage.countDeleteButtons();
    await characteristicsComponentsPage.clickOnLastDeleteButton();

    characteristicsDeleteDialog = new CharacteristicsDeleteDialog();
    expect(await characteristicsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Characteristics?');
    await characteristicsDeleteDialog.clickOnConfirmButton();

    expect(await characteristicsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
