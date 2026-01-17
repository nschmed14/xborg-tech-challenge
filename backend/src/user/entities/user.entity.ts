import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  twitterHandle?: string;

  @Column({ nullable: true })
  discordUsername?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
