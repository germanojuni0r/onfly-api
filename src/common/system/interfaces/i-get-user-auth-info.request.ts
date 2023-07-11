import { Request } from 'express';
import { UserEntity } from 'src/modules/user/src/models/user.entity';

export interface IGetUserAuthInfoRequest extends Request {
  user: UserEntity;
}
