import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import {
	HttpStatus,
	INestApplication,
	ValidationPipe,
	VersioningType,
} from '@nestjs/common';
import {
	DocumentBuilder,
	SwaggerDocumentOptions,
	SwaggerModule,
} from '@nestjs/swagger';
import { API_DESCRIPTION, API_TITLE } from './common/resources';
import { ConfigService } from '@nestjs/config';
import * as csurf from 'csurf';

export async function bootstrap(): Promise<INestApplication> {
	const app = await NestFactory.create(AppModule, { cors: true });

	const appConfigs = app.get(ConfigService);

	// Must have plugins
	app.use(helmet());
	app.use(compression());
	app.use(csurf());

	// Enable versioning
	app.enableVersioning({
		type: VersioningType.HEADER,
		header: 'Version',
	});

	// Setup pipes
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
			transform: true,
			dismissDefaultMessages: true,
		}),
	);

	// Setup swagger
	const swaggerConfig = new DocumentBuilder()
		.setTitle(API_TITLE)
		.setDescription(API_DESCRIPTION)
		.setVersion(process.env.npm_package_version)
		.addGlobalParameters({
			name: 'Version',
			in: 'header',
		})
		.build();
	const options: SwaggerDocumentOptions = {
		operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
	};
	const document = SwaggerModule.createDocument(app, swaggerConfig, options);
	SwaggerModule.setup('api', app, document);

	// Start server
	const port = appConfigs.get('PORT');
	await app.listen(port);
	console.info(`server running on ${await app.getUrl()}`);

	return app;
}
bootstrap();
