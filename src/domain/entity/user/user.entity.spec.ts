import { UserEntity } from './user.entity';
import { User } from '@prisma/client';

describe('UserEntity', () => {
  let userEntity: UserEntity;

  beforeEach(async () => {
    userEntity = new UserEntity(createdUserMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userEntity).toBeDefined();
  });

  it('should construct UserEntity object with valid User input', () => {
    expect(userEntity.id).toBe(createdUserMock.id);
    expect(userEntity.name).toBe(createdUserMock.name);
    expect(userEntity.email).toBe(createdUserMock.email);
    expect(userEntity.birth).toBe(createdUserMock.birth);
    expect(userEntity.biography).toBe(createdUserMock.biography);
    expect(userEntity.password).toBe(createdUserMock.password);
    expect(userEntity.createdAt).toBe(createdUserMock.createdAt);
  });

  it('should access and modify all properties correctly', () => {
    userEntity.id = 2;
    userEntity.name = 'Jane Smith';
    userEntity.email = 'jane.smith@example.com';
    userEntity.birth = new Date('1995-02-02');
    userEntity.biography =
      'Lorem ipsum dolor sit amet consectetur adipiscing elit';
    userEntity.password = 'newpassword456';
    userEntity.createdAt = new Date('2020-08-25');

    expect(userEntity.id).toBe(2);
    expect(userEntity.name).toBe('Jane Smith');
    expect(userEntity.email).toBe('jane.smith@example.com');
    expect(userEntity.birth).toEqual(new Date('1995-02-02'));
    expect(userEntity.biography).toBe(
      'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    );
    expect(userEntity.password).toBe('newpassword456');
    expect(userEntity.createdAt).toEqual(new Date('2020-08-25'));
  });
});

const createdUserMock: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  birth: new Date('1990-01-01'),
  biography: 'Lorem ipsum dolor sit amet',
  password: 'password123',
  createdAt: new Date('2023-08-24'),
};
