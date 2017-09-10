import { NewsAppNgPage } from './app.po';

describe('news-app-ng App', function() {
  let page: NewsAppNgPage;

  beforeEach(() => {
    page = new NewsAppNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
