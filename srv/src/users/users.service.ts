import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) { }

  // get list of all users
  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepo.find();
  }

  // get users by page  
  async getPerPage(page: number, size: number): Promise<{ users: UsersEntity[]; totalCount: number }> {
    const offset: number = (page - 1) * size;
    this.logger.log(`Страница: ${page}, Размер страницы: ${size}, Смещение: ${offset}`);

    const [users, totalCount] = await this.usersRepo.findAndCount({
      take: size,
      skip: offset,
    });

    return { users, totalCount };
  }


}
