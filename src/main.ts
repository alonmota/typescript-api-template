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

export async function bootstrap(): Promise<INestApplication> {
	const app = await NestFactory.create(AppModule);

	// Must have plugins
	app.use(helmet());
	app.use(compression());

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
	const config = new DocumentBuilder()
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
	const document = SwaggerModule.createDocument(app, config, options);
	SwaggerModule.setup('api', app, document);

	// Start server
	const port = 3000;
	await app.listen(port);

	console.info(`server running on ${await app.getUrl()}`);

	return app;
}
bootstrap();
