import { PartialType } from '@nestjs/swagger';
import { CreateRentalHouseDetailsDto } from './create-rental-house-details.dto';

export class UpdateRentalHouseDetailsDto extends PartialType(CreateRentalHouseDetailsDto) {}
