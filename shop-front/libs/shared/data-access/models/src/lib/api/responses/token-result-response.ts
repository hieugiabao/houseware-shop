import { CustomerInfomation } from './../interface';

export interface TokenResultResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  tokenType: string;
  user?: CustomerInfomation;
  employee?: unknown | null;
}
