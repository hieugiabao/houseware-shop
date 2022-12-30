export interface LoginParamsDto {
  email: string;
  password: string;
}

export interface RegisterParamsDto {
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
}
