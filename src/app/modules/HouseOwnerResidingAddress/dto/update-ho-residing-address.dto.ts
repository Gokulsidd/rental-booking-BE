import { PartialType } from '@nestjs/swagger';
import { CreateHOAddressDto } from './create-ho-residing-address.dto';

export class UpdateHOAddressDto extends PartialType  (CreateHOAddressDto) {}