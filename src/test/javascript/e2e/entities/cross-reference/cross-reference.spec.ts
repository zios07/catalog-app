/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CrossReferenceComponentsPage, CrossReferenceDeleteDialog, CrossReferenceUpdatePage } from './cross-reference.page-object';

const expect = chai.expect;

describe('CrossReference e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let crossReferenceUpdatePage: CrossReferenceUpdatePage;
  let crossReferenceComponentsPage: CrossReferenceComponentsPage;
  let crossReferenceDeleteDialog: CrossReferenceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CrossReferences', async () => {
    await navBarPage.goToEntity('cross-reference');
    crossReferenceComponentsPage = new CrossReferenceComponentsPage();
    await browser.wait(ec.visibilityOf(crossReferenceComponentsPage.title), 5000);
    expect(await crossReferenceComponentsPage.getTitle()).to.eq('Cross References');
  });

  it('should load create CrossReference page', async () => {
    await crossReferenceComponentsPage.clickOnCreateButton();
    crossReferenceUpdatePage = new CrossReferenceUpdatePage();
    expect(await crossReferenceUpdatePage.getPageTitle()).to.eq('Create or edit a Cross Reference');
    await crossReferenceUpdatePage.cancel();
  });

  it('should create and save CrossReferences', async () => {
    const nbButtonsBeforeCreate = await crossReferenceComponentsPage.countDeleteButtons();

    await crossReferenceComponentsPage.clickOnCreateButton();
    await promise.all([
      crossReferenceUpdatePage.setCodeInProviderInput('codeInProvider'),
      crossReferenceUpdatePage.providersSelectLastOption(),
      crossReferenceUpdatePage.partsSelectLastOption()
    ]);
    expect(await crossReferenceUpdatePage.getCodeInProviderInput()).to.eq(
      'codeInProvider',
      'Expected CodeInProvider value to be equals to codeInProvider'
    );
    const selectedViewCatalog = crossReferenceUpdatePage.getViewCatalogInput();
    if (await selectedViewCatalog.isSelected()) {
      await crossReferenceUpdatePage.getViewCatalogInput().click();
      expect(await crossReferenceUpdatePage.getViewCatalogInput().isSelected(), 'Expected viewCatalog not to be selected').to.be.false;
    } else {
      await crossReferenceUpdatePage.getViewCatalogInput().click();
      expect(await crossReferenceUpdatePage.getViewCatalogInput().isSelected(), 'Expected viewCatalog to be selected').to.be.true;
    }
    await crossReferenceUpdatePage.save();
    expect(await crossReferenceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await crossReferenceComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last CrossReference', async () => {
    const nbButtonsBeforeDelete = await crossReferenceComponentsPage.countDeleteButtons();
    await crossReferenceComponentsPage.clickOnLastDeleteButton();

    crossReferenceDeleteDialog = new CrossReferenceDeleteDialog();
    expect(await crossReferenceDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Cross Reference?');
    await crossReferenceDeleteDialog.clickOnConfirmButton();

    expect(await crossReferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
