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

export interface PaginateParamsDto {
  page: number;
  perPage: number;
}

export interface UpdateCustomerParamsDto {
  name?: string;
  email?: string;
}

export interface UpdatePasswordParamsDto {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}
