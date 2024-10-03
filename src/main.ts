import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { handleDatabase } from "./app/database/handle.database";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidNonWhitelisted: true,
	}))
	
	await app.listen(3000);
	await handleDatabase()
	console.log("Server running on port 3000");
}
bootstrap();
