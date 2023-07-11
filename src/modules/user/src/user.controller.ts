import {
  Body,
  Controller,
  Get,
  OnApplicationBootstrap,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { UserEntity } from './models/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './services/user.service';
import { IApiReturn } from 'src/common/system/enums/generics/interfaces/i-api-return';
import { User } from 'src/common/decorators/user';
import { UserSignupRequestDTO } from './dtos/request/user-signup.request.dto';
import { UserLoginRequestDTO } from './dtos/request/user-login.request.dto';
import { UserExceptionFilter } from './errors/user-exception-filter';
import { UserLoginDataResponseDTO } from './dtos/response/user-login-data.response.dto';
import { UserResponseDTO } from './dtos/response/user.response.dto';

/**
 * Controller dos usuários. Onde as requisições são tratadas.
 * @author Germano Junior
 */

@Controller('users')
@UseFilters(UserExceptionFilter)
export class UserController implements OnApplicationBootstrap {
  constructor(private readonly _userService: UserService) {}

  onApplicationBootstrap() {
    console.log(`User module has been initialized.`);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @User() user: UserEntity,
  ): Promise<IApiReturn<UserResponseDTO>> {
    const data = await this._userService.findOne(user.id);
    return { data: new UserResponseDTO(data) };
  }

  @Post('signup')
  async signup(
    @Body() dto: UserSignupRequestDTO,
  ): Promise<IApiReturn<UserResponseDTO>> {
    const data = await this._userService.signup(dto);
    return { data: new UserResponseDTO(data) };
  }

  @Post('login')
  async login(
    @Body() dto: UserLoginRequestDTO,
  ): Promise<IApiReturn<UserLoginDataResponseDTO>> {
    const data = await this._userService.login(dto);
    return { data };
  }
}
