import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from '../models/user.entity';
import { UserSignupRequestDTO } from '../dtos/request/user-signup.request.dto';
import { UserLoginRequestDTO } from '../dtos/request/user-login.request.dto';
import { UserDAO } from './daos/user.dao';
import { AccessTokenDAO } from './daos/access-token.dao';
import { ApiErrorCodeEnum } from 'src/common/system/enums/api-error-code.enum';

describe('UserService', () => {
  let userService: UserService;
  let userDAO: UserDAO;
  let accessTokenDAO: AccessTokenDAO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserDAO, AccessTokenDAO],
    }).compile();

    userService = module.get<UserService>(UserService);
    userDAO = module.get<UserDAO>(UserDAO);
    accessTokenDAO = module.get<AccessTokenDAO>(AccessTokenDAO);
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const user: UserEntity = { id: userId, name: 'John Doe' };

      jest.spyOn(userDAO, 'findById').mockResolvedValue(user);

      const result = await userService.findOne(userId);

      expect(userDAO.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });

    it('should throw an error if the user is not found', async () => {
      const userId = 1;

      jest.spyOn(userDAO, 'findById').mockResolvedValue(undefined);

      await expect(userService.findOne(userId)).rejects.toEqual({
        code: ApiErrorCodeEnum.USER_NOT_FOUND,
      });

      expect(userDAO.findById).toHaveBeenCalledWith(userId);
    });
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const dto: UserSignupRequestDTO = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };

      const createdUser = { ...dto, id: 1, isActive: 1 };
      jest.spyOn(userDAO, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(userDAO, 'create').mockResolvedValue(createdUser);

      await userService.signup(dto);

      expect(userDAO.findOne).toHaveBeenCalledWith({
        where: [{ cpf: dto.cpf }, { email: dto.email }],
      });
      expect(userDAO.create).toHaveBeenCalledWith({
        ...dto,
        salt: expect.any(String),
        password: expect.any(String),
        isActive: 1,
      });
    });

    it('should throw an error if the user already exists', async () => {
      const dto: UserSignupRequestDTO = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };

      jest.spyOn(userDAO, 'findOne').mockResolvedValue({ id: 1 });

      await expect(userService.signup(dto)).rejects.toEqual({
        code: ApiErrorCodeEnum.USER_ALREADY_EXISTS,
      });

      expect(userDAO.findOne).toHaveBeenCalledWith({
        where: [{ cpf: dto.cpf }, { email: dto.email }],
      });
      expect(userDAO.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should authenticate the user and return login data', async () => {
      const dto: UserLoginRequestDTO = {
        cpf: '12345678900',
        password: 'password',
      };
      const user: UserEntity = {
        id: 1,
        name: 'John Doe',
        cpf: dto.cpf,
        password: 'encryptedPassword',
        salt: 'encryptedSalt',
      };

      jest.spyOn(userDAO, 'findOne').mockResolvedValue(user);
      jest
        .spyOn(UserService.prototype, '_handleLoginResult')
        .mockResolvedValue({});

      const result = await userService.login(dto);

      expect(userDAO.findOne).toHaveBeenCalledWith({ where: { cpf: dto.cpf } });
      expect(UserService.prototype._handleLoginResult).toHaveBeenCalledWith(
        user,
      );
      expect(result).toEqual({});
    });

    it('should throw an error if the user is not found', async () => {
      const dto: UserLoginRequestDTO = {
        cpf: '12345678900',
        password: 'password',
      };

      jest.spyOn(userDAO, 'findOne').mockResolvedValue(undefined);

      await expect(userService.login(dto)).rejects.toEqual({
        code: ApiErrorCodeEnum.USER_NOT_FOUND,
      });

      expect(userDAO.findOne).toHaveBeenCalledWith({ where: { cpf: dto.cpf } });
    });

    it('should throw an error if the password is incorrect', async () => {
      const dto: UserLoginRequestDTO = {
        cpf: '12345678900',
        password: 'wrongPassword',
      };
      const user: UserEntity = {
        id: 1,
        name: 'John Doe',
        cpf: dto.cpf,
        password: 'encryptedPassword',
        salt: 'encryptedSalt',
      };

      jest.spyOn(userDAO, 'findOne').mockResolvedValue(user);

      await expect(userService.login(dto)).rejects.toEqual({
        code: ApiErrorCodeEnum.INVALID_CREDENTIALS,
      });

      expect(userDAO.findOne).toHaveBeenCalledWith({ where: { cpf: dto.cpf } });
    });
  });
});
