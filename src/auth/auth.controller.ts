import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { Tokens } from './types/tokens';
import { UseInterceptors, UsePipes } from '@nestjs/common/decorators';
import { Public } from '../common/decorators/public.decorator';
import { TransformPlainToInstance } from 'class-transformer';
import { User } from '../users/user.model';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { GetRefreshToken } from '../common/decorators/get-token.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @TransformPlainToInstance(User)
  async signup(@Body() authDTO: AuthDTO) {
    return await this.authService.signup(authDTO);
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() authDTO: AuthDTO): Promise<Tokens> {
    return this.authService.login(authDTO);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({ exceptionFactory: () => UnauthorizedException }),
  )
  refresh(
    @GetCurrentUserId() userId: string,
    @GetRefreshToken() refreshToken: string,
  ) {
    return this.authService.refresh(userId, refreshToken);
  }
}
