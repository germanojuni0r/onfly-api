import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { UserEntity } from '../../models/user.entity';

/**
 * DAO (Data Access Object) dos usuários. Acesso ao banco.
 * @author Germano Junior
 */

@Injectable()
export class UserDAO {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    return await this._userRepository.save(user);
  }

  async find(
    findOptions?: FindManyOptions<UserEntity> | null,
  ): Promise<UserEntity[]> {
    if (findOptions) return await this._userRepository.find(findOptions);
    else return await this._userRepository.find();
  }

  async findOne(
    findOptions?: FindOneOptions<UserEntity>,
  ): Promise<UserEntity | undefined> {
    return await this._userRepository.findOne(findOptions);
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return await this._userRepository.findOne({ where: { id } });
  }
}
