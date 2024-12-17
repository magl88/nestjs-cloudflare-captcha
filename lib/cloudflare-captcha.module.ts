import { HttpModule } from '@nestjs/axios'
import { type DynamicModule, Module } from '@nestjs/common'
import {
	type CloudflareCaptchaAsyncOptions,
	type CloudflareCaptchaOptions,
	CloudflareCaptchaOptionsSymbol,
} from './interfaces/cloudflare-options.interface'
import { CloudflareCaptchaService } from './services/cloudflare-captcha.service'

@Module({})
export class CloudflareCaptchaModule {
	public static forRoot(options: CloudflareCaptchaOptions): DynamicModule {
		return {
			module: CloudflareCaptchaModule,
			imports: [HttpModule],
			providers: [
				{
					provide: CloudflareCaptchaOptionsSymbol,
					useValue: options,
				},
				CloudflareCaptchaService,
			],
			exports: [CloudflareCaptchaService],
			global: true,
		}
	}

	public static forRootAsync(
		options: CloudflareCaptchaAsyncOptions
	): DynamicModule {
		return {
			module: CloudflareCaptchaService,
			imports: [HttpModule, ...(options.imports || [])],
			providers: [
				{
					provide: CloudflareCaptchaOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject || [],
				},
				CloudflareCaptchaService,
			],
			exports: [CloudflareCaptchaService],
			global: true,
		}
	}
}
