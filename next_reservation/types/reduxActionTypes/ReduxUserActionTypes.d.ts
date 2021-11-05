export interface IFirebaseSignUpResult {
  type: string;
  email: string;
  name: string;
  userPicture: StaticImageData;
  brithDay: Date;
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
  userPicture: StaticImageData;
  brithDay: Date;
  token: string;
}

export interface IFirebaseSignInError {
  type: string;
  code: string;
  message: string;
}

export interface SignInFormType {
  email: string;
  password: string;
}

export interface SignUpFormType {
  email: string;
  name: string;
  year: string;
  month: string;
  day: string;
  password: string;
  userPicture: StaticImageData;
}
