/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PartsComponentsPage, PartsDeleteDialog, PartsUpdatePage } from './parts.page-object';

const expect = chai.expect;

describe('Parts e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let partsUpdatePage: PartsUpdatePage;
  let partsComponentsPage: PartsComponentsPage;
  let partsDeleteDialog: PartsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Parts', async () => {
    await navBarPage.goToEntity('parts');
    partsComponentsPage = new PartsComponentsPage();
    await browser.wait(ec.visibilityOf(partsComponentsPage.title), 5000);
    expect(await partsComponentsPage.getTitle()).to.eq('Parts');
  });

  it('should load create Parts page', async () => {
    await partsComponentsPage.clickOnCreateButton();
    partsUpdatePage = new PartsUpdatePage();
    expect(await partsUpdatePage.getPageTitle()).to.eq('Create or edit a Parts');
    await partsUpdatePage.cancel();
  });

  it('should create and save Parts', async () => {
    const nbButtonsBeforeCreate = await partsComponentsPage.countDeleteButtons();

    await partsComponentsPage.clickOnCreateButton();
    await promise.all([
      partsUpdatePage.setCodePartsInput('codeParts'),
      partsUpdatePage.setPartsNameInput('partsName'),
      partsUpdatePage.setPartImageLinkPic360Input('partImageLinkPic360'),
      partsUpdatePage.setPartVideoInput('partVideo'),
      partsUpdatePage.setPartTechnicalManualInput('partTechnicalManual'),
      partsUpdatePage.setEanInput('ean'),
      partsUpdatePage.setSkuInput('sku'),
      // partsUpdatePage.vehicleModelsSelectLastOption(),
      partsUpdatePage.familiesSelectLastOption()
    ]);
    expect(await partsUpdatePage.getCodePartsInput()).to.eq('codeParts', 'Expected CodeParts value to be equals to codeParts');
    expect(await partsUpdatePage.getPartsNameInput()).to.eq('partsName', 'Expected PartsName value to be equals to partsName');
    expect(await partsUpdatePage.getPartImageLinkPic360Input()).to.eq(
      'partImageLinkPic360',
      'Expected PartImageLinkPic360 value to be equals to partImageLinkPic360'
    );
    expect(await partsUpdatePage.getPartVideoInput()).to.eq('partVideo', 'Expected PartVideo value to be equals to partVideo');
    expect(await partsUpdatePage.getPartTechnicalManualInput()).to.eq(
      'partTechnicalManual',
      'Expected PartTechnicalManual value to be equals to partTechnicalManual'
    );
    const selectedUnderDevelopment = partsUpdatePage.getUnderDevelopmentInput();
    if (await selectedUnderDevelopment.isSelected()) {
      await partsUpdatePage.getUnderDevelopmentInput().click();
      expect(await partsUpdatePage.getUnderDevelopmentInput().isSelected(), 'Expected underDevelopment not to be selected').to.be.false;
    } else {
      await partsUpdatePage.getUnderDevelopmentInput().click();
      expect(await partsUpdatePage.getUnderDevelopmentInput().isSelected(), 'Expected underDevelopment to be selected').to.be.true;
    }
    const selectedInactive = partsUpdatePage.getInactiveInput();
    if (await selectedInactive.isSelected()) {
      await partsUpdatePage.getInactiveInput().click();
      expect(await partsUpdatePage.getInactiveInput().isSelected(), 'Expected inactive not to be selected').to.be.false;
    } else {
      await partsUpdatePage.getInactiveInput().click();
      expect(await partsUpdatePage.getInactiveInput().isSelected(), 'Expected inactive to be selected').to.be.true;
    }
    expect(await partsUpdatePage.getEanInput()).to.eq('ean', 'Expected Ean value to be equals to ean');
    expect(await partsUpdatePage.getSkuInput()).to.eq('sku', 'Expected Sku value to be equals to sku');
    await partsUpdatePage.save();
    expect(await partsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await partsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Parts', async () => {
    const nbButtonsBeforeDelete = await partsComponentsPage.countDeleteButtons();
    await partsComponentsPage.clickOnLastDeleteButton();

    partsDeleteDialog = new PartsDeleteDialog();
    expect(await partsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Parts?');
    await partsDeleteDialog.clickOnConfirmButton();

    expect(await partsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
