import { UserService } from './users.service';
import { UsersResponseDto } from "./users.response.dto";
import { Controller, Get, Logger, Query } from '@nestjs/common';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) { }

  @Get()
  async getAllUsers() {
    this.logger.log('Get all users');
    const users = await this.userService.findAll();
    return users.map((user) => UsersResponseDto.fromUsersEntity(user));
  }

  @Get('per-page')
  async getPerPageUsers(
    @Query('page') page = 1,
    @Query('size') size = 20
  ) {
    return this.userService.getPerPage(page, size)
      .then(result => ({
        users: result.users.map(user => UsersResponseDto.fromUsersEntity(user)),
        totalCount: result.totalCount
      }));
  }

}
