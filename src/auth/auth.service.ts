import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthDTO } from './dto/auth.dto';
import { Tokens } from './types/tokens';
import { JwtService } from '@nestjs/jwt/dist';
import { SALT } from '../common/constants';
import {
  AuthMessages,
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(authDTO: AuthDTO) {
    const { login, password } = authDTO;
    const candidate = await this.userService.getByLogin(login);

    if (candidate) throw new ConflictException(AuthMessages.USER_EXISTS);

    const user = await this.userService.create({
      login,
      password,
    });

    await this.updateTokens(user.id, user.login);

    return user;
  }

  async login({ login, password }: AuthDTO): Promise<Tokens> {
    Promise.reject('1');
    const user = await this.userService.getByLogin(login);

    if (!user) throw new ForbiddenException(AuthMessages.NO_USER);

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
      throw new ForbiddenException(AuthMessages.INCORRECT_PASSWORD);

    const tokens = await this.updateTokens(user.id, user.login);
    return tokens;
  }

  async logout(id: string) {
    await this.userService.updateRefreshHash(id, null);
  }

  async refresh(id: string, refreshToken: string) {
    const user = await this.userService.getById(id);

    if (!user.refreshHash)
      throw new ForbiddenException(AuthMessages.TOKEN_EXPIRED);

    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshHash);

    if (!isTokenValid) throw new ForbiddenException(AuthMessages.INVALID_TOKEN);

    const tokens = await this.updateTokens(user.id, user.login);
    return tokens;
  }

  private async updateTokens(sub: string, login: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub, login },
        { expiresIn: TOKEN_EXPIRE_TIME, secret: JWT_SECRET_KEY },
      ),
      this.jwtService.signAsync(
        { sub, login },
        {
          expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
          secret: JWT_SECRET_REFRESH_KEY,
        },
      ),
    ]);

    const refreshHash = await bcrypt.hash(refreshToken, SALT);
    await this.userService.updateRefreshHash(sub, refreshHash);

    return { accessToken, refreshToken };
  }
}
