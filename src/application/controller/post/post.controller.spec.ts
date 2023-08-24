import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostDto } from '../../dto/post/post.dto';
import { PostEntity } from 'src/domain/entity/post/post.entity';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { PostService } from 'src/domain/service/post/post.service';

describe('PostController', () => {
  let postController: PostController;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: {
            created: jest.fn().mockResolvedValue(createdPostEntityMock),
            findById: jest.fn().mockResolvedValue(createdPostEntityMock),
            findAll: jest.fn().mockResolvedValue([createdPostEntityMock]),
            updateById: jest.fn().mockResolvedValue(createdPostEntityMock),
            deleteById: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    postController = module.get<PostController>(PostController);
    postService = module.get<PostService>(PostService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
  });

  describe('OnSucess', () => {
    it('should create a new post when valid postDto is provided', async () => {
      const result = await postController.created(postDtoMock);

      expect(postService.created).toHaveBeenCalledWith(postDtoMock);
      expect(result).toEqual(createdPostEntityMock);
    });

    it('should get a post by ID when valid ID is provided', async () => {
      const result = await postController.findById(1);

      expect(postService.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(createdPostEntityMock);
    });

    it('should get all posts', async () => {
      const result = await postController.findAll();

      expect(postService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([createdPostEntityMock]);
    });

    it('should update a post by ID when valid ID and postDto are provided', async () => {
      const result = await postController.updateById(1, postDtoMock);

      const updatePostDtoMock = postDtoMock;
      updatePostDtoMock.id = 1;

      expect(postService.updateById).toHaveBeenCalledWith(updatePostDtoMock);
      expect(result).toEqual(createdPostEntityMock);
    });

    it('should delete a post by ID when valid ID is provided', async () => {
      const result = await postController.deleteById(1);

      expect(postService.deleteById).toHaveBeenCalledWith(1);
      expect(result).toEqual('Post deleted successfully');
    });
  });

  describe('OnFailure', () => {
    it('should throw server error to created post', async () => {
      jest.spyOn(postService, 'created').mockRejectedValue(undefined);

      const promise = postController.created(postDtoMock);

      await expect(promise).rejects.toThrow(
        new HttpException(
          'Something went wrong, call Batman',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(postService.created).toHaveBeenCalledWith(postDtoMock);
    });

    it('should throw to find post by id post error when invalid id is provided', async () => {
      jest
        .spyOn(postService, 'findById')
        .mockRejectedValue(new NotFoundException('Post not found'));

      const promise = postController.findById(2);

      await expect(promise).rejects.toThrow(
        new HttpException('Post not found', HttpStatus.NOT_FOUND),
      );
      expect(postService.findById).toHaveBeenCalledWith(2);
    });
    it('should throw server error to find post by id ', async () => {
      jest
        .spyOn(postService, 'findById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = postController.findById(2);

      await expect(promise).rejects.toThrow(
        new HttpException(
          'An error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(postService.findById).toHaveBeenCalledWith(2);
    });
    it('should throw server error to find all post ', async () => {
      jest
        .spyOn(postService, 'findAll')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = postController.findAll();

      await expect(promise).rejects.toThrow(
        new HttpException(
          'An error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(postService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw to update a post error when invalid id is provided', async () => {
      jest
        .spyOn(postService, 'updateById')
        .mockRejectedValue(new NotFoundException('Post not found'));

      const promise = postController.updateById(2, postDtoMock);

      const updatePostDtoMock = postDtoMock;
      updatePostDtoMock.id = 2;

      await expect(promise).rejects.toThrow(
        new HttpException('Post not found', HttpStatus.NOT_FOUND),
      );
      expect(postService.updateById).toHaveBeenCalledWith(updatePostDtoMock);
    });
    it('should throw server error to update a post ', async () => {
      jest
        .spyOn(postService, 'updateById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = postController.updateById(2, postDtoMock);

      const updatePostDtoMock = postDtoMock;
      updatePostDtoMock.id = 2;

      await expect(promise).rejects.toThrow(
        new HttpException(
          'An error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(postService.updateById).toHaveBeenCalledWith(updatePostDtoMock);
    });
    it('should throw to delete post error when invalid id is provided', async () => {
      jest
        .spyOn(postService, 'deleteById')
        .mockRejectedValue(new NotFoundException('Post not found'));

      const promise = postController.deleteById(2);

      await expect(promise).rejects.toThrow(
        new HttpException('Post not found', HttpStatus.NOT_FOUND),
      );
      expect(postService.deleteById).toHaveBeenCalledWith(2);
    });
    it('should throw server error to delete a post ', async () => {
      jest
        .spyOn(postService, 'deleteById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = postController.deleteById(2);

      await expect(promise).rejects.toThrow(
        new HttpException(
          'An error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(postService.deleteById).toHaveBeenCalledWith(2);
    });
  });
});

const postDtoMock: PostDto = {
  id: 1,
  content: 'Lorem ipsum dolor sit amet',
  userId: 1,
};

const createdPostEntityMock: PostEntity = {
  id: 1,
  content: 'Lorem ipsum dolor sit amet',
  userId: 1,
  createdAt: new Date('2023-08-24'),
};
