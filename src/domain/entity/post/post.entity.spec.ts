import { PostEntity } from './post.entity';
import { Post } from '@prisma/client';

describe('PostEntity', () => {
  let postEntity: PostEntity;

  beforeEach(async () => {
    postEntity = new PostEntity(createdPostMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(postEntity).toBeDefined();
  });

  it('should construct PostEntity object with valid Post input', () => {
    expect(postEntity.id).toBe(createdPostMock.id);
    expect(postEntity.content).toBe(createdPostMock.content);
    expect(postEntity.userId).toBe(createdPostMock.userId);
    expect(postEntity.createdAt).toBe(createdPostMock.createdAt);
  });

  it('should access and modify all properties correctly', () => {
    postEntity.id = 2;
    postEntity.content =
      'Lorem ipsum dolor sit amet consectetur adipiscing elit';
    postEntity.userId = 2;
    postEntity.createdAt = new Date('2020-08-25');

    expect(postEntity.id).toBe(2);
    expect(postEntity.content).toBe(
      'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    );
    expect(postEntity.userId).toBe(2);
    expect(postEntity.createdAt).toEqual(new Date('2020-08-25'));
  });
});

const createdPostMock: Post = {
  id: 1,
  content: 'Lorem ipsum dolor sit amet',
  userId: 1,
  createdAt: new Date('2023-08-24'),
};
