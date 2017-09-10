import { App01Page } from './app.po';

describe('app01 App', function() {
  let page: App01Page;

  beforeEach(() => {
    page = new App01Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
