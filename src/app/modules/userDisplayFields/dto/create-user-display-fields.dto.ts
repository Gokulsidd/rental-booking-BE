import { IsOptional, IsString, MaxLength } from 'class-validator';


export class CreateUserDisplayFieldsDto {
  @IsString()
  @MaxLength(50)
  fieldName: string;

  @IsString()
  @MaxLength(50)
  userType: 'PUBLIC' | 'NON_PAID' | 'PAID';
}
