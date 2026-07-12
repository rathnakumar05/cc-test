import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../entities';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Video[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const [data, total] = await this.videoRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<Video> {
    const video = await this.videoRepository.findOneBy({ id });
    if (!video) {
      throw new NotFoundException(`Video with id "${id}" not found`);
    }
    return video;
  }

  async update(id: string, updateVideoDto: UpdateVideoDto): Promise<Video> {
    if (!updateVideoDto.title && !updateVideoDto.summary) {
      throw new BadRequestException(
        'At least one of title or summary must be provided',
      );
    }
    const video = await this.findOne(id);
    video.title = updateVideoDto.title ?? video.title;
    video.summary = updateVideoDto.summary ?? video.summary;
    return this.videoRepository.save(video);
  }
}
