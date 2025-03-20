// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { RoleUser } from '../../common/roles.enum';

export const ALLOW_ROLES = 'roles';
export const Roles = (...role: RoleUser[]) => SetMetadata(ALLOW_ROLES, role);