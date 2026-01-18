import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getProfile(userId: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'full_name', 'github_url', 'resume_url', 'motivation', 'challenge_url', 'avatar_url', 'created_at'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, updateData: UpdateProfileDto): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateData);
    await this.userRepository.save(user);

    const { id, email, full_name, github_url, resume_url, motivation, challenge_url, avatar_url, created_at } = user;
    return { id, email, full_name, github_url, resume_url, motivation, challenge_url, avatar_url, created_at };
  }
}
