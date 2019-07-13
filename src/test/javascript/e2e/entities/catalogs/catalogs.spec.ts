/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CatalogsComponentsPage, CatalogsDeleteDialog, CatalogsUpdatePage } from './catalogs.page-object';

const expect = chai.expect;

describe('Catalogs e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let catalogsUpdatePage: CatalogsUpdatePage;
  let catalogsComponentsPage: CatalogsComponentsPage;
  let catalogsDeleteDialog: CatalogsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Catalogs', async () => {
    await navBarPage.goToEntity('catalogs');
    catalogsComponentsPage = new CatalogsComponentsPage();
    await browser.wait(ec.visibilityOf(catalogsComponentsPage.title), 5000);
    expect(await catalogsComponentsPage.getTitle()).to.eq('Catalogs');
  });

  it('should load create Catalogs page', async () => {
    await catalogsComponentsPage.clickOnCreateButton();
    catalogsUpdatePage = new CatalogsUpdatePage();
    expect(await catalogsUpdatePage.getPageTitle()).to.eq('Create or edit a Catalogs');
    await catalogsUpdatePage.cancel();
  });

  it('should create and save Catalogs', async () => {
    const nbButtonsBeforeCreate = await catalogsComponentsPage.countDeleteButtons();

    await catalogsComponentsPage.clickOnCreateButton();
    await promise.all([
      catalogsUpdatePage.setCatalogNameInput('catalogName'),
      catalogsUpdatePage.setCatalogoImagemCover1Input('catalogoImagemCover1'),
      catalogsUpdatePage.setCatalogoImagemCover2Input('catalogoImagemCover2'),
      catalogsUpdatePage.setCatalogoImagemCover3Input('catalogoImagemCover3'),
      catalogsUpdatePage.setCatalogoImagemCover4Input('catalogoImagemCover4'),
      catalogsUpdatePage.userSelectLastOption()
    ]);
    expect(await catalogsUpdatePage.getCatalogNameInput()).to.eq('catalogName', 'Expected CatalogName value to be equals to catalogName');
    expect(await catalogsUpdatePage.getCatalogoImagemCover1Input()).to.eq(
      'catalogoImagemCover1',
      'Expected CatalogoImagemCover1 value to be equals to catalogoImagemCover1'
    );
    expect(await catalogsUpdatePage.getCatalogoImagemCover2Input()).to.eq(
      'catalogoImagemCover2',
      'Expected CatalogoImagemCover2 value to be equals to catalogoImagemCover2'
    );
    expect(await catalogsUpdatePage.getCatalogoImagemCover3Input()).to.eq(
      'catalogoImagemCover3',
      'Expected CatalogoImagemCover3 value to be equals to catalogoImagemCover3'
    );
    expect(await catalogsUpdatePage.getCatalogoImagemCover4Input()).to.eq(
      'catalogoImagemCover4',
      'Expected CatalogoImagemCover4 value to be equals to catalogoImagemCover4'
    );
    await catalogsUpdatePage.save();
    expect(await catalogsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await catalogsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Catalogs', async () => {
    const nbButtonsBeforeDelete = await catalogsComponentsPage.countDeleteButtons();
    await catalogsComponentsPage.clickOnLastDeleteButton();

    catalogsDeleteDialog = new CatalogsDeleteDialog();
    expect(await catalogsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Catalogs?');
    await catalogsDeleteDialog.clickOnConfirmButton();

    expect(await catalogsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
