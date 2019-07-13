/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LinesComponentsPage, LinesDeleteDialog, LinesUpdatePage } from './lines.page-object';

const expect = chai.expect;

describe('Lines e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let linesUpdatePage: LinesUpdatePage;
  let linesComponentsPage: LinesComponentsPage;
  let linesDeleteDialog: LinesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Lines', async () => {
    await navBarPage.goToEntity('lines');
    linesComponentsPage = new LinesComponentsPage();
    await browser.wait(ec.visibilityOf(linesComponentsPage.title), 5000);
    expect(await linesComponentsPage.getTitle()).to.eq('Lines');
  });

  it('should load create Lines page', async () => {
    await linesComponentsPage.clickOnCreateButton();
    linesUpdatePage = new LinesUpdatePage();
    expect(await linesUpdatePage.getPageTitle()).to.eq('Create or edit a Lines');
    await linesUpdatePage.cancel();
  });

  it('should create and save Lines', async () => {
    const nbButtonsBeforeCreate = await linesComponentsPage.countDeleteButtons();

    await linesComponentsPage.clickOnCreateButton();
    await promise.all([
      linesUpdatePage.setLineNameInput('lineName'),
      linesUpdatePage.setLineImageInput('lineImage'),
      linesUpdatePage.setLineIconInput('lineIcon'),
      linesUpdatePage.catalogsSelectLastOption()
    ]);
    expect(await linesUpdatePage.getLineNameInput()).to.eq('lineName', 'Expected LineName value to be equals to lineName');
    expect(await linesUpdatePage.getLineImageInput()).to.eq('lineImage', 'Expected LineImage value to be equals to lineImage');
    expect(await linesUpdatePage.getLineIconInput()).to.eq('lineIcon', 'Expected LineIcon value to be equals to lineIcon');
    await linesUpdatePage.save();
    expect(await linesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await linesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Lines', async () => {
    const nbButtonsBeforeDelete = await linesComponentsPage.countDeleteButtons();
    await linesComponentsPage.clickOnLastDeleteButton();

    linesDeleteDialog = new LinesDeleteDialog();
    expect(await linesDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Lines?');
    await linesDeleteDialog.clickOnConfirmButton();

    expect(await linesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
