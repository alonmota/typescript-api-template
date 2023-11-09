import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
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
