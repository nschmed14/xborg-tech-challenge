import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsUrl, MinLength } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  @IsUrl()
  github_url: string;

  @Column({ nullable: true })
  @IsUrl()
  resume_url: string;

  @Column({ type: 'text', nullable: true })
  @MinLength(50, { message: 'Motivation must be at least 50 characters' })
  motivation: string;

  @Column({ nullable: true })
  challenge_url: string;

  @Column({ nullable: true })
  google_id: string;

  @Column({ nullable: true })
  avatar_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
