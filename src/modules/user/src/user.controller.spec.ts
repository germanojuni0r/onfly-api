import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { UserEntity } from './models/user.entity';
import { UserSignupRequestDTO } from './dtos/request/user-signup.request.dto';
import { UserLoginRequestDTO } from './dtos/request/user-login.request.dto';
import { AuthGuard } from '@nestjs/passport';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('findOne', () => {
    it('should return the user', async () => {
      // Mock the userService findOne method
      const user: UserEntity = { id: 1, name: 'John Doe' };
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const result = await userController.findOne(user);

      expect(userService.findOne).toHaveBeenCalledWith(user.id);
      expect(result).toEqual({ data: user });
    });
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const dto: UserSignupRequestDTO = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };
      const createdUser: UserEntity = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };

      // Mock the userService signup method
      jest.spyOn(userService, 'signup').mockResolvedValue(createdUser);

      const result = await userController.signup(dto);

      expect(userService.signup).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ data: createdUser });
    });
  });

  describe('login', () => {
    it('should authenticate the user', async () => {
      const dto: UserLoginRequestDTO = {
        email: 'john@example.com',
        password: 'password',
      };
      const authenticatedUser: UserEntity = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };

      // Mock the userService login method
      jest.spyOn(userService, 'login').mockResolvedValue(authenticatedUser);

      const result = await userController.login(dto);

      expect(userService.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ data: authenticatedUser });
    });
  });

  // Test the presence of decorators
  it('should have decorators', () => {
    const decorators = Reflect.getMetadataKeys(UserController);

    expect(decorators).toContainEqual('path:/users');
    expect(decorators).toContainEqual('useFilters:UserExceptionFilter');
  });

  // Test the presence of guards
  it('should have guards', () => {
    const guards = Reflect.getMetadata(
      AuthGuard,
      UserController.prototype,
      'findOne',
    );

    expect(guards).toEqual(AuthGuard('jwt'));
  });
});
