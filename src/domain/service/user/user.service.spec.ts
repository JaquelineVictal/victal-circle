import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repository/user/user.repository';
import { UserDto } from 'src/application/dto/user/user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            created: jest.fn().mockResolvedValue(createdUserMock),
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(createdUserMock),
            findAll: jest.fn().mockResolvedValue([createdUserMock]),
            updateById: jest.fn().mockResolvedValue(createdUserMock),
            deleteById: jest.fn().mockResolvedValue(createdUserMock),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('OnSucess', () => {
    it('should create a new user when valid userDto is provided', async () => {
      const result = await userService.created(userDtoMock);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        userDtoMock.email,
      );
      expect(userRepository.created).toHaveBeenCalledWith(userDtoMock);
      expect(result).toEqual(createdUserMock);
    });

    it('should get a user by ID when valid ID is provided', async () => {
      const result = await userService.findById(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(createdUserMock);
    });

    it('should get all users', async () => {
      const result = await userService.findAll();

      expect(userRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([createdUserMock]);
    });

    it('should update a user by ID when valid ID and userDto are provided', async () => {
      const updateUserDtoMock = userDtoMock;
      updateUserDtoMock.id = 1;
      const result = await userService.updateById(updateUserDtoMock);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.updateById).toHaveBeenCalledWith(updateUserDtoMock);
      expect(result).toEqual(createdUserMock);
    });

    it('should delete a user by ID when valid ID is provided', async () => {
      const result = await userService.deleteById(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.deleteById).toHaveBeenCalledWith(1);
      expect(result).toEqual(createdUserMock);
    });
  });

  describe('OnFailure', () => {
    it('should throw to created user error when invalid userDto is provided', async () => {
      jest
        .spyOn(userRepository, 'findByEmail')
        .mockResolvedValue(createdUserMock);

      const promise = userService.created(userDtoMock);

      await expect(promise).rejects.toThrow(
        new ConflictException('Email already exists'),
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        userDtoMock.email,
      );
      expect(userRepository.created).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to created user', async () => {
      jest
        .spyOn(userRepository, 'created')
        .mockRejectedValue(new Error('database error'));

      const promise = userService.created(userDtoMock);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        userDtoMock.email,
      );
      expect(userRepository.created).toHaveBeenCalledWith(userDtoMock);
    });

    it('should throw server error to find user by id', async () => {
      jest
        .spyOn(userRepository, 'findById')
        .mockRejectedValue(new Error('database error'));

      const promise = userService.findById(2);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(userRepository.findById).toHaveBeenCalledWith(2);
    });

    it('should throw server error to find all user ', async () => {
      jest
        .spyOn(userRepository, 'findAll')
        .mockRejectedValue(new Error('database error'));

      const promise = userService.findAll();

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(userRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw to update a user error when invalid id is provided', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);
      const updateUserDtoMock = userDtoMock;
      updateUserDtoMock.id = 2;

      const promise = userService.updateById(updateUserDtoMock);

      await expect(promise).rejects.toThrow(
        new NotFoundException('User not found'),
      );
      expect(userRepository.findById).toHaveBeenCalledWith(2);
      expect(userRepository.updateById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to update a user ', async () => {
      jest
        .spyOn(userRepository, 'updateById')
        .mockRejectedValue(new Error('database error'));

      const updateUserDtoMock = userDtoMock;
      updateUserDtoMock.id = 2;

      const promise = userService.updateById(updateUserDtoMock);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(userRepository.findById).toHaveBeenCalledWith(2);
      expect(userRepository.updateById).toHaveBeenCalledWith(updateUserDtoMock);
    });
    it('should throw to delete user error when invalid id is provided', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      const promise = userService.deleteById(2);

      await expect(promise).rejects.toThrow(
        new NotFoundException('User not found'),
      );
      expect(userRepository.findById).toHaveBeenCalledWith(2);
      expect(userRepository.deleteById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to delete a user ', async () => {
      jest
        .spyOn(userRepository, 'deleteById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = userService.deleteById(2);

      await expect(promise).rejects.toThrow(new Error('An error occurred'));
      expect(userRepository.findById).toHaveBeenCalledWith(2);
      expect(userRepository.deleteById).toHaveBeenCalledWith(2);
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

const createdUserMock: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  birth: new Date('1990-01-01'),
  biography: 'Lorem ipsum dolor sit amet',
  password: 'password123',
  createdAt: new Date('2023-08-24'),
};
