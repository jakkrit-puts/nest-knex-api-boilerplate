// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleUser } from '../../common/roles.enum';
import { ALLOW_ROLES } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RoleUser[]>(ALLOW_ROLES, [
            context.getHandler(),
            context.getClass(),
          ]);
      
          if (!requiredRoles) return true; // No roles required, allow access

          const { user } = context.switchToHttp().getRequest();
        //   console.log(user.roles); // debug
          
          return requiredRoles.some((role) => user?.roles?.includes(role));
    }
}
