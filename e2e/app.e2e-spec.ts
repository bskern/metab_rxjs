import { MetabRxjsPage } from './app.po';

describe('metab-rxjs App', function() {
  let page: MetabRxjsPage;

  beforeEach(() => {
    page = new MetabRxjsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
