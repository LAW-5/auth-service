import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import {
  LoginRequestDto,
  RegisterMerchantDto,
  RegisterRequestDto,
  ValidateRequestDto,
} from '../auth.dto';
import {
  LoginResponse,
  RegisterMerchantResponse,
  RegisterResponse,
  ValidateResponse,
} from '../auth.pb';
import { Auth } from '../schema/auth.entity';
import { UserRole } from '../schema/enum';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  @InjectRepository(Auth)
  private readonly repository: Repository<Auth>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger;

  public async register({
    email,
    password,
    fullName,
  }: RegisterRequestDto): Promise<RegisterResponse> {
    let auth: Auth = await this.repository.findOne({
      where: { email },
    });

    this.logger.log('info', `creating user with email : ${email}`);

    if (auth) {
      this.logger.log('warn', `user with email : ${email} already exist`);
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }

    auth = new Auth();

    auth.email = email;
    auth.name = fullName;
    auth.password = this.jwtService.encodePassword(password);
    auth.role = UserRole.USER;

    await this.repository.save(auth);

    return { status: HttpStatus.CREATED, error: null };
  }

  public async registerMerchant({
    email,
    password,
    merchantName,
  }: RegisterMerchantDto): Promise<RegisterMerchantResponse> {
    let auth: Auth = await this.repository.findOne({
      where: { email },
    });

    this.logger.log('info', `creating merchant with email : ${email}`);

    if (auth) {
      this.logger.log('warn', `merchant with email : ${email} already exist`);
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }

    auth = new Auth();

    auth.email = email;
    auth.name = merchantName;
    auth.password = this.jwtService.encodePassword(password);
    auth.role = UserRole.MERCHANT;

    await this.repository.save(auth);

    return { status: HttpStatus.CREATED, error: null };
  }

  public async login({
    email,
    password,
  }: LoginRequestDto): Promise<LoginResponse> {
    const auth: Auth = await this.repository.findOne({
      where: { email },
    });

    this.logger.log('info', `attempting login for email: ${email}`);

    if (!auth) {
      this.logger.log('warn', `no user with email: ${email}`);
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['E-Mail not found'],
        token: null,
      };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(
      password,
      auth.password,
    );

    if (!isPasswordValid) {
      this.logger.log('warn', `wrong password login for email: ${email}`);
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Wrong password'],
        token: null,
      };
    }

    const token: string = this.jwtService.generateToken(auth);

    return { status: HttpStatus.OK, error: null, token };
  }

  public async validate({
    token,
  }: ValidateRequestDto): Promise<ValidateResponse> {
    const decode: Auth = await this.jwtService.verify(token);

    this.logger.log('info', `validatin token`);

    if (!decode) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        userId: null,
      };
    }

    const auth: Auth = await this.jwtService.validateUser(decode);

    if (!auth) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User not found'],
        userId: null,
      };
    }

    return { status: HttpStatus.OK, error: null, userId: decode.id };
  }
}
