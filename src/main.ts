import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { handleDatabase } from "./common/database/handle.database";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidNonWhitelisted: true,
	}))

	app.use(cookieParser());
	app.enableCors({
		credentials: true,
		origin: "http://localhost:5173",
	})
	await app.listen(3000);
	await handleDatabase()
	console.log("Server running on port 3000");
}
bootstrap();
