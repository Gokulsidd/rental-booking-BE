import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalHouseViewedHistoryDto } from './create-rental-house-viewed-history.dto';

export class UpdateRentalHouseViewedHistoryDto extends PartialType(CreateRentalHouseViewedHistoryDto) {}
