export {};

describe('/room/register/ryokan URL 컴포넌트 테스팅', () => {
  it('로그인이 되어있지 않을 시 /login으로 리다이렉트', () => {
    cy.visit('/room/register/ryokan');
    cy.url().should('eq', 'http://localhost:3000/login');
  });
  it('비 로그인 상태에서 리다이렉션 -> 로그인 후 접근 -> 료칸 등록페이지 접근', () => {
    cy.visit('/room/register/ryokan');
    cy.url().should('eq', 'http://localhost:3000/login');
    cy.get('#email-input').type('kms3335k@naver.com');
    cy.get('#password-input').type('examplePassword');
    cy.get('.submit-btn').should('not.be.disabled').click();

    cy.wait(3000);

    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('.header-user-profile').click();
    cy.get('.header-user-profile-wrapper button:nth-child(3)').click();

    cy.wait(5000);

    cy.url().should('eq', 'http://localhost:3000/room/register/ryokan');
  });
  it('로그인 상태에서 료칸 타입 작성 완료 후 침실등록 페이지(2단계) 이동', () => {
    cy.visit('/room/register/ryokan');
    cy.url().should('eq', 'http://localhost:3000/login');
    cy.get('#email-input').type('kms3335k@naver.com');
    cy.get('#password-input').type('scx1220@');
    cy.get('.submit-btn').should('not.be.disabled').click();

    cy.wait(3000);

    cy.url({ timeout: 5000 }).should('eq', 'http://localhost:3000/');
    cy.get('.header-user-profile').click();
    cy.get('.register-ryokan').click();

    cy.get('.next-page-btn', { timeout: 30000 }).should('be.disabled');
    cy.get('.ryokan-type-selector').select('화양실');
    cy.get('.ryokan-building-type-selector').select('개인실');
    cy.get('.ryokan-built-in-onsen').check();
    cy.get('.next-page-btn').should('not.be.disabled').click();
    cy.url({ timeout: 30000 }).should(
      'eq',
      'http://localhost:3000/room/register/bedrooms'
    );
  });
});
