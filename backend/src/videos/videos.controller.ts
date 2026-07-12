import { Controller, Get, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VideosService } from './videos.service';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Video } from '../entities';

@ApiTags('Videos')
@Controller('api/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  @ApiOperation({ summary: 'Get all homepage top videos (paginated)' })
  findAll(@Query() query: PaginationQueryDto) {
    return this.videosService.findAll(query.page, query.limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a video by id' })
  @ApiResponse({ status: 200, type: Video })
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update title and summary of a video' })
  @ApiResponse({ status: 200, type: Video })
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }
}
