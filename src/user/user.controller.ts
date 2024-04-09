import { Body, Controller, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SETTINGS } from 'src/app.utils';

import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Email may be already in use. Try again!' })
  async doUserRegistration(
    @Body(SETTINGS.VALIDATION_PIPE)
    userRegister: UserRegisterRequestDto,
  ): Promise<User> {
    return await this.userService.doUserRegistration(userRegister);
  }

  @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  @Post('favorites/add:id')
  async addFavorite(@Request() req, @Param('id', new ParseIntPipe()) id: number ) {
    const userId = req.user.id; // Assuming you're storing user ID in the JWT payload
    await this.userService.addCatToUser(userId, id);
    return { success: true, message: 'Cat added to favorites successfully' };
  }
}
