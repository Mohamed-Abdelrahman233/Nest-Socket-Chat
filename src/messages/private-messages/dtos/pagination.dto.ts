import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional() 
  @Type(() => Number) 
  @IsInt({ message: 'You must provide a valid number for the page' }) 
  @Min(1, { message: 'The minimum page number is 1' }) 
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 20; 
}