import { PartialType } from '@nestjs/mapped-types';
import { ThinksDto } from './think';

export class UpdateThinkDto extends PartialType(ThinksDto) { }
