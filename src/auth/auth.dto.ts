import { IsEmail, IsString } from 'class-validator';
import {
  LoginRequest,
  RegisterMecrhantRequest,
  RegisterRequest,
  ValidateRequest,
} from './auth.pb';

export class LoginRequestDto implements LoginRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class RegisterRequestDto implements RegisterRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly fullName: string;

  @IsString()
  public readonly password: string;
}

export class ValidateRequestDto implements ValidateRequest {
  @IsString()
  public readonly token: string;
}

export class RegisterMerchantDto implements RegisterMecrhantRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  @IsString()
  public readonly merchantName: string;
}
