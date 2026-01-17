import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const publicRoutes = [
      "/auth/login/google",
      "/auth/validate/google",
      "/health",
    ];
    
    if (publicRoutes.some(route => request.url.startsWith(route))) {
      return true;
    }
    
    return super.canActivate(context);
  }
}
