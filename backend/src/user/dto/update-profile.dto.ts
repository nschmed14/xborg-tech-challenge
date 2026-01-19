import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsUrl,
} from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  full_name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsUrl()
  @IsOptional()
  github_url?: string;

  @IsUrl()
  @IsOptional()
  resume_url?: string;

  @IsString()
  @MinLength(50, { message: 'Motivation must be at least 50 characters long' })
  @IsOptional()
  motivation?: string;

  @IsUrl()
  @IsOptional()
  challenge_url?: string;
}
