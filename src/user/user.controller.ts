import { Body, Controller, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SETTINGS } from '../app.utils';

import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Email may be already in use. Try again!' })
  async doUserRegistration(
    @Body(SETTINGS.VALIDATION_PIPE)
    userRegister: UserRegisterRequestDto,
  ): Promise<{ user: User; message: string }> {
    const user = await this.userService.doUserRegistration(userRegister);
    return { user, message: 'Successfully registered user!' };
  }

  @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  @Post('favorites/add:id')
  async addFavorite(@Request() req, @Param('id', new ParseIntPipe()) id: number): Promise<{ success: boolean; message: string }> {
    const userId = req.user.id; //Get ID form the JWT payload
    await this.userService.addCatToUser(userId, id);
    return { success: true, message: 'Cat added to favorites successfully' };
  }
}
