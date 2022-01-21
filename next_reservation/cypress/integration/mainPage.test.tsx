export {};

describe('메인화면 예약기능', () => {
  it('위치, 체크인, 체크아웃 까지 입력하면 알림창이 뜨면서 검색을 하지않는가?', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[placeholder=위치입력]').type('서울', { force: true });
    cy.get('.place0').click({ force: true });
    cy.get('input[placeholder="위치입력"]').should(
      'have.value',
      '대한민국 서울'
    );

    cy.get('input[placeholder="체크인 날짜입력"]').click({ force: true });
    cy.get('div[aria-label="Choose 2022년 1월 22일 토요일"]').click({
      force: true,
    });
    cy.get('input[placeholder="체크인 날짜입력"]').should(
      'have.value',
      '2022-01-22',
      { force: true }
    );
    cy.get('input[placeholder="체크아웃 날짜입력"]').click({ force: true });
    cy.get('div[aria-label="Choose 2022년 1월 24일 월요일"]').click({
      force: true,
    });
    cy.get('input[placeholder="체크아웃 날짜입력"]').should(
      'have.value',
      '2022-01-24',
      { force: true }
    );

    //* 검색버튼
    cy.get('div[cy-test="search-btn"]').click({ force: true });
    cy.url().should(
      'not.eq',
      'http://localhost:3000/search?place=대한민국 서울'
    );
  });
  it('위치, 체크인, 체크아웃, 인원수까지 입력하면 검색을 하는가?', () => {
    cy.visit('http://localhost:3000/');

    //* 장소
    cy.get('input[placeholder=위치입력]').type('서울', { force: true });
    cy.get('.place0').click({ force: true });
    cy.get('input[placeholder="위치입력"]').should(
      'have.value',
      '대한민국 서울'
    );

    //* 체크인 날짜
    cy.get('input[placeholder="체크인 날짜입력"]').click({ force: true });
    cy.get('div[aria-label="Choose 2022년 1월 22일 토요일"]').click({
      force: true,
    });
    cy.get('input[placeholder="체크인 날짜입력"]').should(
      'have.value',
      '2022-01-22',
      { force: true }
    );

    //* 체크아웃 날짜
    cy.get('input[placeholder="체크아웃 날짜입력"]').click({ force: true });
    cy.get('div[aria-label="Choose 2022년 1월 24일 월요일"]').click({
      force: true,
    });
    cy.get('input[placeholder="체크아웃 날짜입력"]').should(
      'have.value',
      '2022-01-24',
      { force: true }
    );
    //* 인원수
    cy.get('input[placeholder="인원수 추가"]').click({ force: true });
    cy.get('button[cy-test="adult-add"]').click({ force: true });
    cy.get('button[cy-test="adult-add"]').click({ force: true });
    cy.get('button[cy-test="adult-add"]').click({ force: true });
    cy.get('button[cy-test="adult-sub"]').click({ force: true });

    //* 검색버튼
    cy.get('div[cy-test="search-btn"]').click({ force: true });
    cy.url({ timeout: 30000 }).should(
      'eq',
      'http://localhost:3000/room/search?place=%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%EC%84%9C%EC%9A%B8'
    );
  });

  it('위치 추천 카드를 누르면 검색을 하는가?', () => {
    cy.visit('http://localhost:3000/');
    cy.get('div[cy-test=recommend-place-0]').click({ force: true });

    cy.url({ timeout: 30000 }).should(
      'eq',
      'http://localhost:3000/room/search?place=%EC%84%9C%EC%9A%B8'
    );
  });
});
