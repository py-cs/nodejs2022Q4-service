import { Injectable } from '@nestjs/common';
import {
  scryptCompare,
  scryptHash,
  UsersService,
} from '../users/users.service';
import { AuthDTO } from './dto/auth.dto';
import { Tokens } from './types/tokens';
import { JwtService } from '@nestjs/jwt/dist';
import {
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} from './auth.constants';
import { errors } from '../common/utils/errors';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(authDTO: AuthDTO) {
    // Promise.reject('dfsdf');
    // throw new Error('oops');
    const { login, password } = authDTO;
    const candidate = await this.userService.getByLogin(login);
    if (candidate) throw errors.userExists(login);

    const user = await this.userService.create({
      login,
      password,
    });

    await this.updateTokens(user.id, user.login);

    return user;
  }

  async login({ login, password }: AuthDTO): Promise<Tokens> {
    const user = await this.userService.getByLogin(login);
    if (!user) throw errors.invalidCredentials();

    const isCorrectPassword = await scryptCompare(password, user.password);

    if (!isCorrectPassword) throw errors.invalidCredentials();

    const tokens = await this.updateTokens(user.id, user.login);
    return tokens;
  }

  async logout(id: string) {
    await this.userService.updateRefreshHash(id, null);
  }

  async refresh(id: string, refreshToken: string) {
    const user = await this.userService.getById(id);
    if (!user.refreshHash) throw errors.invalidToken();

    const isTokenValid = await scryptCompare(refreshToken, user.refreshHash);

    if (!isTokenValid) throw errors.invalidToken();

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

    const refreshHash = await scryptHash(refreshToken);

    await this.userService.updateRefreshHash(sub, refreshHash);

    return { accessToken, refreshToken };
  }
}
