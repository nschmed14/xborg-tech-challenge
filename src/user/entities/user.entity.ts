import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  full_name: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ nullable: true, unique: true })
  google_id: string;

  @Column({ nullable: true })
  github_url: string;

  @Column({ nullable: true })
  resume_url: string;

  @Column({ type: 'text', nullable: true })
  motivation: string;

  @Column({ nullable: true })
  challenge_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
