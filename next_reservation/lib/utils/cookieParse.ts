type SplitionCookieType = { key: string; value: string };

export default function (cookieString: string) {
  const splitionCookies: SplitionCookieType[] = [];

  cookieString
    .split('; ')
    .map((cookie) => cookie.split('='))
    .forEach((cookieKeyAndValue) => {
      splitionCookies.push({
        key: cookieKeyAndValue[0],
        value: cookieKeyAndValue[1],
      });
    });

  return splitionCookies;
}
