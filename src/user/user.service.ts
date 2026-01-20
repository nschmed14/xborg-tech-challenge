import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { google_id: googleId } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createOrUpdate(userData: Partial<User>): Promise<User> {
    let user: User;
    
    if (userData.google_id) {
      user = await this.findByGoogleId(userData.google_id);
    } else if (userData.email) {
      user = await this.findByEmail(userData.email);
    }

    if (user) {
      // Update existing user
      Object.assign(user, userData);
    } else {
      // Create new user
      user = this.usersRepository.create(userData);
    }

    return this.usersRepository.save(user);
  }

  async updateProfile(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
