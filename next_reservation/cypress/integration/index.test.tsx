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

  it('회원가입 양식 작성 후 회원가입이 완료가 되는가?', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button.header-sign-up-btn').click();

    cy.get('#email-input').type('example@naver.com');
    cy.get('#name-input').type('newMember');
    cy.get('.brithYear').select('1991');
    cy.get('.brithMonth').select('10');
    cy.get('.brithDay').select('28');
    cy.get('#password-input').type('qwer1234@');
    cy.get('#check-password').type('qwer1234@');
    cy.get('.submit-btn').should('not.be.disabled').click();

    cy.wait(4000);

    cy.get('.swal2-title')
      .should('have.text', '가입완료!')
      .should('be.visible');
  });

  it('이미 회원가입 되어있는 회원은 오류 메세지가 발생하는가?', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button.header-sign-up-btn').click();

    cy.get('#email-input').type('example@naver.com');
    cy.get('#name-input').type('newMember');
    cy.get('.brithYear').select('1991');
    cy.get('.brithMonth').select('5');
    cy.get('.brithDay').select('12');
    cy.get('#password-input').type('password1234@');
    cy.get('#check-password').type('password1234@');
    cy.get('.submit-btn').should('not.be.disabled').click();

    cy.wait(4000);

    cy.get('.swal2-title')
      .should('have.text', '중복된 이메일')
      .should('be.visible');
  });

  it('이메일 인증을 못받은 회원은 로그인이 불가능한가?', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button.header-sign-in-btn').click();

    cy.get('#email-input').type('example@naver.com');
    cy.get('#password-input').type('password1234@');
    cy.get('.submit-btn').should('not.be.disabled').click();

    cy.wait(2000);

    cy.get('.swal2-html-container')
      .should(
        'have.text',
        '이메일 인증을 완료해야 로그인이 가능합니다.\n가입하셨던 이메일을 확인하세요.'
      )
      .should('be.visible');
    cy.get('.swal2-confirm').click();
  });

  it('이메일 인증을 받은 회원은 로그인이 가능한가? 로그인 이후에닌 반드시 쿠키의 JWT 리프레시 토큰을 받는가?', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button.header-sign-in-btn').click();

    cy.get('#email-input').type('example@icloud.com');
    cy.get('#password-input').type('password1234@');
    cy.get('.submit-btn').should('not.be.disabled').click();

    cy.wait(3000);

    cy.get('.header-user-profile').should('be.visible');
    cy.getCookie('access_token').should('exist');
  });

  it('JWT토큰을 받은 후 새로고침하면 로그인 유지가 되는가?', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button.header-sign-in-btn').click();

    cy.get('#email-input').type('example@icloud.com');
    cy.get('#password-input').type('password1234@');
    cy.get('.submit-btn').should('not.be.disabled').click();

    cy.wait(3000);

    cy.get('.header-user-profile').should('be.visible');
    cy.getCookie('access_token').should('exist');

    cy.reload();
    cy.get('.header-user-profile').should('be.visible');
  });

  it('로그인이 이후 로그아웃을 하면 로그아웃이 작동하고, 쿠키가(토큰이) 삭제되는가?', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button.header-sign-in-btn').click();

    cy.get('#email-input').type('example@icloud.com');
    cy.get('#password-input').type('password1234@');
    cy.get('.submit-btn').should('not.be.disabled').click();

    cy.wait(3000);

    cy.get('.header-user-profile').should('be.visible');
    cy.getCookie('access_token').should('exist');

    cy.get('.header-user-profile').click();
    cy.get('.header-user-logout').click();
    cy.getCookie('access_token').should('not.exist');

    cy.get('button.header-sign-in-btn').should('be.visible');
  });
});
