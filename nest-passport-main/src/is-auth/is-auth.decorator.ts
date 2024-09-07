import { SetMetadata } from '@nestjs/common';
export const IS_AUTH = 'IS_AUTH';
export const IsAuth = (...args: string[]) => SetMetadata(IS_AUTH, true);
