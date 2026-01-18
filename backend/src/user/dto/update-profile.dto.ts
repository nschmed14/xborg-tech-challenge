import { IsString, IsUrl, MinLength, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsUrl()
  github_url?: string;

  @IsOptional()
  @IsUrl()
  resume_url?: string;

  @IsOptional()
  @IsString()
  @MinLength(50, { message: 'Motivation must be at least 50 characters' })
  motivation?: string;

  @IsOptional()
  @IsUrl()
  challenge_url?: string;
}
