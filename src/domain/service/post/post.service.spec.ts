import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PostRepository } from 'src/infrastructure/repository/post/post.repository';
import { PostDto } from 'src/application/dto/post/post.dto';
import { PostService } from './post.service';
import { Post } from '@prisma/client';

describe('PostService', () => {
  let postService: PostService;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PostRepository,
          useValue: {
            created: jest.fn().mockResolvedValue(createdPostMock),
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(createdPostMock),
            findAll: jest.fn().mockResolvedValue([createdPostMock]),
            updateById: jest.fn().mockResolvedValue(createdPostMock),
            deleteById: jest.fn().mockResolvedValue(createdPostMock),
          },
        },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    postRepository = module.get<PostRepository>(PostRepository);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });

  describe('OnSucess', () => {
    it('should create a new post when valid postDto is provided', async () => {
      const result = await postService.created(postDtoMock);

      expect(postRepository.created).toHaveBeenCalledWith(postDtoMock);
      expect(result).toEqual(createdPostMock);
    });

    it('should get a post by ID when valid ID is provided', async () => {
      const result = await postService.findById(1);

      expect(postRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(createdPostMock);
    });

    it('should get all posts', async () => {
      const result = await postService.findAll();

      expect(postRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([createdPostMock]);
    });

    it('should update a post by ID when valid ID and postDto are provided', async () => {
      const updatePostDtoMock = postDtoMock;
      updatePostDtoMock.id = 1;
      const result = await postService.updateById(updatePostDtoMock);

      expect(postRepository.findById).toHaveBeenCalledWith(1);
      expect(postRepository.updateById).toHaveBeenCalledWith(updatePostDtoMock);
      expect(result).toEqual(createdPostMock);
    });

    it('should delete a post by ID when valid ID is provided', async () => {
      const result = await postService.deleteById(1);

      expect(postRepository.findById).toHaveBeenCalledWith(1);
      expect(postRepository.deleteById).toHaveBeenCalledWith(1);
      expect(result).toEqual(createdPostMock);
    });
  });

  describe('OnFailure', () => {
    it('should throw server error to created post', async () => {
      jest
        .spyOn(postRepository, 'created')
        .mockRejectedValue(new Error('database error'));

      const promise = postService.created(postDtoMock);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(postRepository.created).toHaveBeenCalledWith(postDtoMock);
    });

    it('should throw server error to find post by id', async () => {
      jest
        .spyOn(postRepository, 'findById')
        .mockRejectedValue(new Error('database error'));

      const promise = postService.findById(2);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(postRepository.findById).toHaveBeenCalledWith(2);
    });

    it('should throw server error to find all post ', async () => {
      jest
        .spyOn(postRepository, 'findAll')
        .mockRejectedValue(new Error('database error'));

      const promise = postService.findAll();

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(postRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw to update a post error when invalid id is provided', async () => {
      jest.spyOn(postRepository, 'findById').mockResolvedValue(null);
      const updatePostDtoMock = postDtoMock;
      updatePostDtoMock.id = 2;

      const promise = postService.updateById(updatePostDtoMock);

      await expect(promise).rejects.toThrow(
        new NotFoundException('Post not found'),
      );
      expect(postRepository.findById).toHaveBeenCalledWith(2);
      expect(postRepository.updateById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to update a post ', async () => {
      jest
        .spyOn(postRepository, 'updateById')
        .mockRejectedValue(new Error('database error'));

      const updatePostDtoMock = postDtoMock;
      updatePostDtoMock.id = 2;

      const promise = postService.updateById(updatePostDtoMock);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(postRepository.findById).toHaveBeenCalledWith(2);
      expect(postRepository.updateById).toHaveBeenCalledWith(updatePostDtoMock);
    });
    it('should throw to delete post error when invalid id is provided', async () => {
      jest.spyOn(postRepository, 'findById').mockResolvedValue(null);

      const promise = postService.deleteById(2);

      await expect(promise).rejects.toThrow(
        new NotFoundException('Post not found'),
      );
      expect(postRepository.findById).toHaveBeenCalledWith(2);
      expect(postRepository.deleteById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to delete a post ', async () => {
      jest
        .spyOn(postRepository, 'deleteById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = postService.deleteById(2);

      await expect(promise).rejects.toThrow(new Error('An error occurred'));
      expect(postRepository.findById).toHaveBeenCalledWith(2);
      expect(postRepository.deleteById).toHaveBeenCalledWith(2);
    });
  });
});

const postDtoMock: PostDto = {
  id: 1,
  content: 'Lorem ipsum dolor sit amet',
  userId: 1,
};

const createdPostMock: Post = {
  id: 1,
  content: 'Lorem ipsum dolor sit amet',
  userId: 1,
  createdAt: new Date('2023-08-24'),
};
