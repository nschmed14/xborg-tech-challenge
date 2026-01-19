import { Module, DynamicModule, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TestAuthController } from './test-auth.controller';
import { SimpleTestController } from './simple-test.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({})
export class AuthModule {
  static register(): DynamicModule {
    const providers: Provider[] = [AuthService, JwtStrategy];
    const controllers = [AuthController, TestAuthController, SimpleTestController];

    // Conditionally add GoogleStrategy if GOOGLE_CLIENT_ID is set
    if (process.env.GOOGLE_CLIENT_ID) {
      providers.push(GoogleStrategy);
    }

    return {
      module: AuthModule,
      imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '7d' },
          }),
          inject: [ConfigService],
        }),
      ],
      controllers,
      providers,
      exports: [AuthService],
    };
  }
}
