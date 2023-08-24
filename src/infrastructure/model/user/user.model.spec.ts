import { UserDto } from 'src/application/dto/user/user.dto';
import { UserModel } from './user.model';

describe('UserModel', () => {
  let userModel: UserModel;

  beforeEach(async () => {
    userModel = new UserModel(createdUserDtoMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userModel).toBeDefined();
  });

  it('should save the user model with valid data', () => {
    const saveUserModel = userModel.saveUserModel();

    expect(saveUserModel).toEqual({
      name: 'John Doe',
      email: 'john.doe@example.com',
      birth: new Date('1990-01-01'),
      biography: 'Lorem ipsum dolor sit amet',
      password: 'password123',
    });
  });

  it('should update the user model with valid data', () => {
    const updateUserModel = userModel.updateUserModel();

    expect(updateUserModel).toEqual({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        birth: new Date('1990-01-01'),
        biography: 'Lorem ipsum dolor sit amet',
        password: 'password123',
      },
      filter: {
        id: 1,
      },
    });
  });
});

const createdUserDtoMock: UserDto = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  birth: '1990-01-01',
  biography: 'Lorem ipsum dolor sit amet',
  password: 'password123',
};
