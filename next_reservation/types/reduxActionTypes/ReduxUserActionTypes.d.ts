export interface IFirebaseSignUpResult {
  type: string;
  email: string;
  name: string;
  userPicture: string;
  brithDay: string | null;
  token?: string;
}

export interface IFirebaseSignUpError {
  type: string;
  code: any;
  message: any;
}

export interface IFirebaseSignInResult {
  type: string;
  email: string;
  name: string;
  userPicture: string;
  brithDay: string | null;
  token: string;
}

export interface IFirebaseSignInError {
  type: string;
  code: string;
  message: string;
}

export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignUpForm {
  email: string;
  name: string;
  year: string;
  month: string;
  day: string;
  password: string;
  userPicture: StaticImageData;
}
