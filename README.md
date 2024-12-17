# NestJS Cloudflare CAPTCHA

This module provides integration with Cloudflare CAPTCHA (also known as Turnstile) for NestJS-based applications.

## Installation

To install this module, use npm or yarn:

```bash
npm install nestjs-cloudflare-captcha
# or
yarn add nestjs-cloudflare-captcha
```

## Usage

### 1. Module Configuration

To use CloudflareCaptchaModule, you need to import it into your main module and pass the configuration.

**Example using synchronous configuration:**

```typescript
import { Module } from '@nestjs/common'
import { CloudflareCaptchaModule } from 'nestjs-cloudflare-captcha'

@Module({
	imports: [
		CloudflareCaptchaModule.forRoot({
			secretKey: process.env.CAPTCHA_SECRET_KEY,
			token: req => req.body.captchaToken,
			skipIf: process.env.NODE_ENV === 'development',
		}),
	],
})
export class AppModule {}
```

**Example using asynchronous configuration:**

```typescript
import { Module } from '@nestjs/common'
import { CloudflareCaptchaModule } from 'nestjs-cloudflare-captcha'

@Module({
	imports: [
		CloudflareCaptchaModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				secretKey: configService.get('CAPTCHA_SECRET_KEY'),
				token: req => req.body.captchaToken,
				skipIf: process.env.NODE_ENV === 'development',
			}),
		}),
	],
})
export class AppModule {}
```

### 2. Protect Routes with CAPTCHA

To protect routes from bots, use Turnstile as a decorator.

**Example usage in a controller:**

```typescript
import { Controller, Post } from '@nestjs/common'
import { Turnstile } from 'nestjs-cloudflare-captcha'

@Controller('auth')
export class SomeController {
	@Post('login')
	@Turnstile()
	login() {
		return 'This method is protected from bots with CAPTCHA'
	}
}
```

## Support

If you have any questions or issues, feel free to contact the author.

-   Author: [TeaCoder](https://teacoder.ru)
-   Contributors:
    -   Vadim Nechaev (help@teacoder.ru)

## License

This project is licensed under the [MIT License](LICENSE).
