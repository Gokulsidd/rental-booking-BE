import { IsEmail, IsString, IsBoolean, IsOptional ,Matches} from 'class-validator';

export class CreateTenantDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;


  @IsString()
  schemeId: string;

  @IsBoolean()
  @IsOptional() 
  status?: boolean;

  
      @IsOptional()
      @IsString()
      address1?: string;
    
      
      @IsOptional()
      @IsString()
      address2?: string;
    
      
      @IsOptional()
      @IsString()
      city?: string;
    
    
      @IsOptional()
      @IsString()
      district?: string;
    
      
      @IsOptional()
      @IsString()
      state?: string;
    
      
      @IsOptional()
      @Matches(/^\d{6}$/, { message: 'Pincode must be a 6-digit number' })
      pincode?: string;
    
}
