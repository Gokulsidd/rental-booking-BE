import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDisplayFieldsDto } from './create-user-display-fields.dto';

export class UpdateUserDisplayFieldsDto extends PartialType(CreateUserDisplayFieldsDto) {}
