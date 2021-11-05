import cookieParse from '../../lib/utils/cookieParseToArray';

const mockData = jest.fn((cookie) => cookie);
test('쿠키파싱 테스트', () => {
  expect(
    cookieParse(
      mockData(
        'access_token=lbnRpdGllcyI6eyJlbWFpbCI6WyJrbXMzMzM1a0BuYXZlci5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.akOvmf6w0n3MW4VC5E2lMONlb2-UHCEp8r6wDUE1j0ihs0ijfSCAqHBhejyG9FLnbCbaN7w8fs2J8jT7R6DT6qzSjo4oyfmCv87iSBkX5CMzk_fVh0UrsHKKor7xEn0HTXTNleIa669U-PkDC1x-HRLwwQ-VlpqaCk3KFre4jn6Ey7jlSKaWj-N_wro1BxVt2tKeZu2omYk-SBZcLPzu7DoTlTA0ygq1dREN-CoSQxdtON6jMx1JyiUQ78xJYjSk-AIHfI4fWQtErClS9N0mFMdW2lD9pGnkeTw9VgknXcgizZ01VQAzc7bElxDbsLf-vzdLIWHbuC5u-f9Dj3iHOA; abs=afdsjkfalk3rhjekfc'
      )
    )
  ).toStrictEqual([
    {
      key: 'access_token',
      value:
        'lbnRpdGllcyI6eyJlbWFpbCI6WyJrbXMzMzM1a0BuYXZlci5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.akOvmf6w0n3MW4VC5E2lMONlb2-UHCEp8r6wDUE1j0ihs0ijfSCAqHBhejyG9FLnbCbaN7w8fs2J8jT7R6DT6qzSjo4oyfmCv87iSBkX5CMzk_fVh0UrsHKKor7xEn0HTXTNleIa669U-PkDC1x-HRLwwQ-VlpqaCk3KFre4jn6Ey7jlSKaWj-N_wro1BxVt2tKeZu2omYk-SBZcLPzu7DoTlTA0ygq1dREN-CoSQxdtON6jMx1JyiUQ78xJYjSk-AIHfI4fWQtErClS9N0mFMdW2lD9pGnkeTw9VgknXcgizZ01VQAzc7bElxDbsLf-vzdLIWHbuC5u-f9Dj3iHOA',
    },
    { key: 'abs', value: 'afdsjkfalk3rhjekfc' },
  ]);
  expect(
    cookieParse(
      mockData(
        'access_token=theToken; imMock=mockmockmockmockmockmockmockmockmockmockmockmock'
      )
    )
  ).toStrictEqual([
    {
      key: 'access_token',
      value: 'theToken',
    },
    {
      key: 'imMock',
      value: 'mockmockmockmockmockmockmockmockmockmockmockmock',
    },
  ]);
});
