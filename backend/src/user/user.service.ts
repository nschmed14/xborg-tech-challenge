import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getProfile(userId: number): Promise<User> {
    return this.findOne(userId);
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<User> {
    await this.usersRepository.update(userId, updateProfileDto);
    return this.findOne(userId);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findOrCreate(profile: any): Promise<User> {
    let user = await this.findByEmail(profile.email);
    
    if (!user) {
      user = this.usersRepository.create({
        email: profile.email,
        full_name: profile.displayName,
        google_id: profile.id,
        avatar_url: profile.photos?.[0]?.value,
      });
      await this.usersRepository.save(user);
    } else if (!user.google_id) {
      user.google_id = profile.id;
      user.avatar_url = profile.photos?.[0]?.value;
      await this.usersRepository.save(user);
    }
    
    return user;
  }
}
