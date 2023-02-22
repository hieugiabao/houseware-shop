import { CustomerInfomation } from './../interface';

export interface TokenResultResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  user?: CustomerInfomation;
  employee?: unknown | null;
}
