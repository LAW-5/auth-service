import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  LoginRequestDto,
  RegisterMerchantDto,
  RegisterRequestDto,
  ValidateRequestDto,
} from './auth.dto';
import {
  AUTH_SERVICE_NAME,
  LoginResponse,
  RegisterMerchantResponse,
  RegisterResponse,
  ValidateResponse,
} from './auth.pb';
import { AuthService } from './service/auth.service';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  private register(payload: RegisterRequestDto): Promise<RegisterResponse> {
    return this.service.register(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  private login(payload: LoginRequestDto): Promise<LoginResponse> {
    return this.service.login(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  private validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    return this.service.validate(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'RegisterMerchant')
  private registerMerchant(
    payload: RegisterMerchantDto,
  ): Promise<RegisterMerchantResponse> {
    return this.service.registerMerchant(payload);
  }
}
