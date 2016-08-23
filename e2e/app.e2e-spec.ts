import { NgChallengePage } from './app.po';

describe('ng-challenge App', function() {
  let page: NgChallengePage;

  beforeEach(() => {
    page = new NgChallengePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
