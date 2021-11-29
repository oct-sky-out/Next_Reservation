export {};

describe('욕실 정보 등록 테스트', () => {
  it('로그인이 되어있지 않을 시 /login으로 이동한다.', () => {
    cy.visit('/room/register/bathrooms');
    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('비 로그인 상태에서 리다이렉션 -> 로그인 -> 료칸 등록페이지, 침실 등록 -> 욕실 등록 접근 후 양식 작성', () => {
    cy.visit('/room/register/ryokan');
    cy.url().should('eq', 'http://localhost:3000/login');
    cy.get('#email-input').type('kms3335k@naver.com');
    cy.get('#password-input').type('scx1220@');
    cy.get('.submit-btn').should('not.be.disabled').click();

    cy.url({ timeout: 5000 }).should('eq', 'http://localhost:3000/');
    cy.get('.header-user-profile').click();
    cy.get('.register-ryokan').click();

    cy.get('.next-page-btn', { timeout: 30000 }).should('be.disabled');
    cy.get('.ryokan-type-selector').select('화양실');
    cy.get('.ryokan-building-type-selector').select('개인실');
    cy.get('.ryokan-built-in-onsen').check({ force: true });
    cy.get('.next-page-btn').should('not.be.disabled').click();
    cy.url({ timeout: 30000 }).should(
      'eq',
      'http://localhost:3000/room/register/bedrooms'
    );

    //최대 숙박인원 버튼
    cy.get('.select-maximum-personnel > button').eq(1).click(); // + btn
    cy.get('.select-maximum-personnel > button').first().click(); // - btn
    cy.get('.select-maximum-personnel > button').eq(1).click().click().click();
    cy.get('.select-maximum-personnel > span').should('contain.text', '3');

    cy.get('.next-page-btn').should('not.be.enabled');

    cy.get('.ryokan-bedroom-count-selector').select('침실 1개');
    cy.get('.add-or-modifiy-bed-btn').should('have.length', 1).click(); // 첫번째 침대 추가/수정하기 버튼 클릭 시

    cy.get('.bedroom-inside-bed-wrapper > div')
      .should('have.length', 3)
      .eq(1)
      .children()
      .should('contain.text', '싱글 사이즈');

    cy.get('.bed-register-complete-btn').should('not.be.enabled');

    cy.get('.bedroom-inside-bed-wrapper > div')
      .eq(2)
      .find('button[value="add"]')
      .click();
    cy.get('.bed-register-complete-btn').should('be.enabled').click();
    cy.get('.next-page-btn').should('be.enabled').click();

    // 욕실 등록 페이지
    cy.url({ timeout: 30000 }).should(
      'eq',
      'http://localhost:3000/room/register/bathrooms'
    );

    cy.get('.next-page-btn').should('be.disabled');

    cy.get('button[value="add"]').click().click();
    cy.get('input[name="nonSharedBathroomRadio"]').click();

    cy.get('.next-page-btn').should('not.be.disabled').click();
    cy.url({ timeout: 30000 }).should(
      'eq',
      'http://localhost:3000/room/register/location'
    );
  });
});
