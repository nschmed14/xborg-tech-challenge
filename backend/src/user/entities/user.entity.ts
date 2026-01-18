import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'full_name' })
  full_name: string;

  @Column({ name: 'github_url', nullable: true })
  github_url: string;

  @Column({ name: 'resume_url', nullable: true })
  resume_url: string;

  @Column({ type: 'text', nullable: true })
  motivation: string;

  @Column({ name: 'challenge_url', nullable: true })
  challenge_url: string;

  @Column({ name: 'google_id', unique: true })
  google_id: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatar_url: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  // Helper method to get profile data for API response
  @Expose()
  get profile() {
    return {
      full_name: this.full_name,
      email: this.email,
      github_url: this.github_url,
      resume_url: this.resume_url,
      motivation: this.motivation,
      challenge_url: this.challenge_url,
      avatar_url: this.avatar_url,
    };
  }
}