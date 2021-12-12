import 'cypress-file-upload';

describe('료칸등록 5단계 료칸 편의 시설등록', () => {
  it('로그인이 되어있지 않을 시 /login으로 이동한다.', () => {
    cy.visit('/room/register/location');
    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('로그인 후 1,2,3,4,5,6단계 등록 후 7단계 료칸 사진등록', () => {
    cy.visit('/');
    cy.get('.header-sign-in-btn').click();
    cy.get('#email-input').type('kms3335k@naver.com');
    cy.get('#password-input').type('scx1220@');
    cy.get('.submit-btn').should('not.be.disabled').click();

    cy.get('.header-user-profile', { timeout: 10000 }).click();
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
    cy.get('[cy-testid="share"]').click();

    cy.get('.next-page-btn').should('not.be.disabled').click();
    cy.url({ timeout: 30000 }).should(
      'eq',
      'http://localhost:3000/room/register/location'
    );
    cy.get('[cy-testid="contry"]', { timeout: 30000 })
      .select('대한민국')
      .should('have.value', '대한민국');

    cy.get('[cy-testid="adress"]')
      .type('서울특별시 영등포구 여의동 의사당대로 1')
      .should('have.value', '서울특별시 영등포구 여의동 의사당대로 1');

    cy.get('[cy-testid="postcode"]')
      .type('150-703')
      .should('have.value', '150-703');

    cy.get('.next-page-btn').should('not.be.disabled');

    cy.get('[cy-testid="detail-address"]')
      .type('111호')
      .should('have.value', '111호');

    cy.get('.next-page-btn').should('not.be.disabled').click();

    cy.url({ timeout: 30000 }).should(
      'eq',
      'http://localhost:3000/room/register/geometry'
    );
    cy.get('.next-page-btn').should('not.be.disabled').click();

    cy.url({ timeout: 30000 }).should(
      'eq',
      'http://localhost:3000/room/register/amenities'
    );
    cy.get('.next-page-btn').should('not.be.disabled');

    // 조식
    cy.get('[data-testid="0-breakfast"]').click();
    cy.get('[data-testid="0-breakfast"]').click({ force: true });
    cy.get('[data-testid="0-breakfast"]').should('not.be.checked');

    // 옷장
    cy.get('[data-testid="1-closet"]').click();
    cy.get('[data-testid="1-closet"]').should('be.checked');

    // 냉방
    cy.get('[data-testid="2-coolingEquipment"]').click();
    cy.get('[data-testid="2-coolingEquipment"]').should('be.checked');

    // 난방
    cy.get('[data-testid="3-heatingEquipment"]').click();
    cy.get('[data-testid="3-heatingEquipment"]').should('be.checked');

    // 인터넷
    cy.get('[data-testid="4-internet"]').click();
    cy.get('[data-testid="4-internet"]').click({ force: true });
    cy.get('[data-testid="4-internet"]').should('not.be.checked');

    // 세면용품
    cy.get('[data-testid="5-toiletries"]').click();
    cy.get('[data-testid="5-toiletries"]').should('be.checked');

    // 드라이기
    cy.get('[data-testid="6-hairdryer"]').click();
    cy.get('[data-testid="6-hairdryer"]').should('be.checked');

    // 티비
    cy.get('[data-testid="7-tv"]').click();
    cy.get('[data-testid="7-tv"]').click({ force: true });
    cy.get('[data-testid="7-tv"]').should('not.be.checked');

    cy.get('.next-page-btn').should('not.be.disabled').click();

    cy.url({ timeout: 30000 }).should(
      'eq',
      'http://localhost:3000/room/register/convenienceSpaces'
    );
    cy.get('.next-page-btn').should('not.be.disabled');

    // 헬스장
    cy.get('[data-testid="0-gym"]').click();
    cy.get('[data-testid="0-gym"]').click();
    cy.get('[data-testid="0-gym"]').should('not.be.checked');

    // 자구지
    cy.get('[data-testid="1-jacuzzi"]').click();
    cy.get('[data-testid="1-jacuzzi"]').click();
    cy.get('[data-testid="1-jacuzzi"]').should('not.be.checked');

    // 주차장
    cy.get('[data-testid="2-parkingLot"]').click();
    cy.get('[data-testid="2-parkingLot"]').should('be.checked');

    // 수영장
    cy.get('[data-testid="3-swimmingPool"]').click();
    cy.get('[data-testid="3-swimmingPool"]').click();
    cy.get('[data-testid="3-swimmingPool"]').should('not.be.checked');

    // 세탁기
    cy.get('[data-testid="4-washingMachine"]').click();
    cy.get('[data-testid="4-washingMachine"]').should('be.checked');

    // 정원
    cy.get('[data-testid="5-garden"]').click();
    cy.get('[data-testid="5-garden"]').click();
    cy.get('[data-testid="5-garden"]').should('not.be.checked');

    cy.get('.next-page-btn').should('not.be.disabled').click();

    cy.url({ timeout: 30000 }).should(
      'eq',
      'http://localhost:3000/room/register/ryokanPhotos'
    );

    const runningPhoto = 'mockPhoto.jpg';
    cy.get('[data-testid="file-input"]').attachFile(runningPhoto);

    cy.get('[data-testid="photo-1"]').should('exist');
    cy.get('.next-page-btn').should('not.be.disabled');

    //! create-Element를 인식 못함.
    // cy.get('[data-testid="photo-modify"]')
    //   .should('exist')
    //   .click({ force: true })
    // const catPhoto = 'catPicture.jpg';
    // cy.get('[data-testid="test-modify"]').attachFile(catPhoto);

    cy.get('[data-testid="photo-delete"]')
      .should('exist')
      .click({ force: true });
    cy.get('[data-testid="select-photo"]', { timeout: 5000 })
      .should('exist')
      .should('not.be.disabled');

    cy.get('.next-page-btn').should('be.disabled');
  });
});
