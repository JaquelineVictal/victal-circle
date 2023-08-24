import { PostDto } from 'src/application/dto/post/post.dto';
import { PostModel } from './post.model';

describe('PostModel', () => {
  let postModel: PostModel;

  beforeEach(async () => {
    postModel = new PostModel(createdPostDtoMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(postModel).toBeDefined();
  });

  it('should save the user model with valid data', () => {
    const savePostModel = postModel.savePostModel();

    expect(savePostModel).toEqual({
      content: 'Lorem ipsum dolor sit amet',
      user: { connect: { id: 1 } },
    });
  });

  it('should update the user model with valid data', () => {
    const updatePostModel = postModel.updatePostModel();

    expect(updatePostModel).toEqual({
      data: {
        content: 'Lorem ipsum dolor sit amet',
        user: { connect: { id: 1 } },
      },
      filter: {
        id: 1,
      },
    });
  });
});

const createdPostDtoMock: PostDto = {
  id: 1,
  content: 'Lorem ipsum dolor sit amet',
  userId: 1,
};
