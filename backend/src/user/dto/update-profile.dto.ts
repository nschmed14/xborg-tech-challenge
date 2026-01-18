import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  github_url?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  resume_url?: string;

  @IsOptional()
  @IsString()
  @MinLength(50)
  motivation?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  challenge_url?: string;
}
