export {};

describe('Home', () => {
  it('페이지 요청이 완료되는가?.', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
  });

  it('회원가입 버튼 클릭 시 모달창이 열리고 배경을 누르면 닫히는가?', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
    cy.get('button.header-sign-up-btn').click();

    cy.get('.sign-up').should('be.visible'); // 열림

    cy.get('.modal-background').click({ force: true });
    cy.get('.sign-up').should('not.exist');
  });

  it('.header-wrapper 클래스 (프로젝트 로고)클릭 시 홈 화면으로 이동하는가?', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
    cy.get('.header-wrapper').click();

    cy.location('pathname').should('equal', '/');
  });
});
