type SplitionCookieType = { key: string; value: string };

export default function cookieParseToArray(cookieString: string | undefined) {
  const splitionCookies: SplitionCookieType[] = [];

  if (cookieString !== undefined) {
    cookieString
      .split('; ')
      .map((cookie) => cookie.split('='))
      .forEach((cookieKeyAndValue) => {
        splitionCookies.push({
          key: cookieKeyAndValue[0],
          value: cookieKeyAndValue[1],
        });
      });
  }

  return splitionCookies;
}
