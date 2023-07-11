import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { AccessTokenEntity } from '../../models/access-token.entity';

/**
 * DAO (Data Access Object) dos tokens de acesso. Acesso ao banco.
 * @author Germano Junior
 */

@Injectable()
export class AccessTokenDAO {
  constructor(
    @InjectRepository(AccessTokenEntity)
    private readonly _accessTokenRepository: Repository<AccessTokenEntity>,
  ) {}

  async create(accessToken: AccessTokenEntity): Promise<AccessTokenEntity> {
    return await this._accessTokenRepository.save(accessToken);
  }

  async find(
    findOptions?: FindManyOptions<AccessTokenEntity> | null,
  ): Promise<AccessTokenEntity[]> {
    if (findOptions) return await this._accessTokenRepository.find(findOptions);
    else return await this._accessTokenRepository.find();
  }

  async findById(id: number): Promise<AccessTokenEntity | undefined> {
    return await this._accessTokenRepository.findOne({ where: { id } });
  }

  async findByToken(
    token: string,
    withDeleted = false,
  ): Promise<AccessTokenEntity | undefined> {
    return await this._accessTokenRepository.findOne({
      where: { token },
      withDeleted,
    });
  }

  async deleteLastToken(userId: number, accessTokenId: number): Promise<void> {
    await this._accessTokenRepository
      .createQueryBuilder('accesstoken')
      .softDelete()
      .where('accesstoken.id <> :accessTokenId', { accessTokenId })
      .andWhere('accesstoken.user_id = :userId', { userId })
      .andWhere('accesstoken.deleted_at is null')
      .execute();
  }

  async deleteByToken(token: string): Promise<void> {
    await this._accessTokenRepository.softDelete({ token });
  }
}
