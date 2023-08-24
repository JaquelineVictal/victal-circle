import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from 'src/domain/service/user.service';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from 'src/domain/entity/user.entity';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            created: jest.fn().mockResolvedValue(createdUserEntityMock),
            findById: jest.fn().mockResolvedValue(createdUserEntityMock),
            findAll: jest.fn().mockResolvedValue([createdUserEntityMock]),
            updateById: jest.fn().mockResolvedValue(createdUserEntityMock),
            deleteById: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('OnSucess', () => {
    it('should create a new user when valid userDto is provided', async () => {
      const result = await userController.created(userDtoMock);

      expect(userService.created).toHaveBeenCalledWith(userDtoMock);
      expect(result).toEqual(createdUserEntityMock);
    });

    it('should get a user by ID when valid ID is provided', async () => {
      const result = await userController.findById(1);

      expect(userService.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(createdUserEntityMock);
    });

    it('should get all users', async () => {
      const result = await userController.findAll();

      expect(userService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([createdUserEntityMock]);
    });

    it('should update a user by ID when valid ID and userDto are provided', async () => {
      const result = await userController.updateById(1, userDtoMock);

      const updateUserDtoMock = userDtoMock;
      updateUserDtoMock.id = 1;

      expect(userService.updateById).toHaveBeenCalledWith(updateUserDtoMock);
      expect(result).toEqual(createdUserEntityMock);
    });

    it('should delete a user by ID when valid ID is provided', async () => {
      const result = await userController.deleteById(1);

      expect(userService.deleteById).toHaveBeenCalledWith(1);
      expect(result).toEqual('User deleted successfully');
    });
  });

  describe('OnFailure', () => {
    it('should throw to created user error when invalid userDto is provided', async () => {
      jest
        .spyOn(userService, 'created')
        .mockRejectedValue(new ConflictException('Email already exists'));

      const promise = userController.created(userDtoMock);

      await expect(promise).rejects.toThrow(
        new HttpException('Email already exists', HttpStatus.BAD_REQUEST),
      );
      expect(userService.created).toHaveBeenCalledWith(userDtoMock);
    });
    it('should throw server error to created user', async () => {
      jest.spyOn(userService, 'created').mockRejectedValue(undefined);

      const promise = userController.created(userDtoMock);

      await expect(promise).rejects.toThrow(
        new HttpException(
          'Something went wrong, call Batman',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(userService.created).toHaveBeenCalledWith(userDtoMock);
    });

    it('should throw to find user by id user error when invalid id is provided', async () => {
      jest
        .spyOn(userService, 'findById')
        .mockRejectedValue(new NotFoundException('User not found'));

      const promise = userController.findById(2);

      await expect(promise).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
      expect(userService.findById).toHaveBeenCalledWith(2);
    });
    it('should throw server error to find user by id ', async () => {
      jest
        .spyOn(userService, 'findById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = userController.findById(2);

      await expect(promise).rejects.toThrow(
        new HttpException(
          'An error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(userService.findById).toHaveBeenCalledWith(2);
    });
    it('should throw server error to find all user ', async () => {
      jest
        .spyOn(userService, 'findAll')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = userController.findAll();

      await expect(promise).rejects.toThrow(
        new HttpException(
          'An error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw to update a user error when invalid id is provided', async () => {
      jest
        .spyOn(userService, 'updateById')
        .mockRejectedValue(new NotFoundException('User not found'));

      const promise = userController.updateById(2, userDtoMock);

      const updateUserDtoMock = userDtoMock;
      updateUserDtoMock.id = 2;

      await expect(promise).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
      expect(userService.updateById).toHaveBeenCalledWith(updateUserDtoMock);
    });
    it('should throw server error to update a user ', async () => {
      jest
        .spyOn(userService, 'updateById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = userController.updateById(2, userDtoMock);

      const updateUserDtoMock = userDtoMock;
      updateUserDtoMock.id = 2;

      await expect(promise).rejects.toThrow(
        new HttpException(
          'An error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(userService.updateById).toHaveBeenCalledWith(updateUserDtoMock);
    });
    it('should throw to delete user error when invalid id is provided', async () => {
      jest
        .spyOn(userService, 'deleteById')
        .mockRejectedValue(new NotFoundException('User not found'));

      const promise = userController.deleteById(2);

      await expect(promise).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
      expect(userService.deleteById).toHaveBeenCalledWith(2);
    });
    it('should throw server error to delete a user ', async () => {
      jest
        .spyOn(userService, 'deleteById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = userController.deleteById(2);

      await expect(promise).rejects.toThrow(
        new HttpException(
          'An error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(userService.deleteById).toHaveBeenCalledWith(2);
    });
  });
});

const userDtoMock: UserDto = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  birth: '1990-01-01',
  biography: 'Lorem ipsum dolor sit amet',
  password: 'password123',
};

const createdUserEntityMock: UserEntity = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  birth: new Date('1990-01-01'),
  biography: 'Lorem ipsum dolor sit amet',
  password: 'password123',
  createdAt: new Date('2023-08-24'),
};
