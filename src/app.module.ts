import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { validate } from './config/env.validation';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
			validate,
			expandVariables: true,
		}),
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 10,
			},
		]),
		UsersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
