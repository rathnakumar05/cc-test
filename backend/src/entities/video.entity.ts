import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('homepage_top_videos')
export class Video {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '1:2:6523544', required: false })
  @Index('idx_post_id')
  @Column({ name: 'post_id', nullable: true })
  postId: string;

  @ApiProperty({
    example: 'Streets reopened after beams in buckling midtown high-rise',
  })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({ example: 'Street closures around a buckling building...' })
  @Column({ type: 'text', nullable: true })
  summary: string;

  @ApiProperty({ example: 'https://www.facebook.com/sharer/sharer.php?u=...' })
  @Column({ name: 'facebook_link', nullable: true })
  facebookLink: string;

  @ApiProperty({ example: 'https://twitter.com/intent/tweet?text=...' })
  @Column({ name: 'twitter_link', nullable: true })
  twitterLink: string;

  @ApiProperty({ example: 'https://twitter.com/intent/tweet?text=...' })
  @Column({ name: 'test_link', nullable: true })
  testLink: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
