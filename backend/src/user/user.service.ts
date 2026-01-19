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

  async findOrCreate(googleProfile: {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { google_id: googleProfile.googleId },
    });

    if (!user) {
      user = this.userRepository.create({
        google_id: googleProfile.googleId,
        email: googleProfile.email,
        full_name: googleProfile.name,
        avatar_url: googleProfile.picture,
      });
      await this.userRepository.save(user);
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.findById(id);

    // Update only provided fields
    Object.keys(updateProfileDto).forEach((key) => {
      if (updateProfileDto[key] !== undefined) {
        user[key] = updateProfileDto[key];
      }
    });

    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
