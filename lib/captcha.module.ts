import { HttpModule } from '@nestjs/axios'
import { type DynamicModule, Module } from '@nestjs/common'
import {
	type CaptchaAsyncOptions,
	type CaptchaOptions,
	CaptchaOptionsSymbol,
} from './interfaces/options.interface'
import { CaptchaService } from './services/captcha.service'

@Module({})
export class CaptchaModule {
	public static forRoot(options: CaptchaOptions): DynamicModule {
		return {
			module: CaptchaModule,
			imports: [HttpModule],
			providers: [
				{
					provide: CaptchaOptionsSymbol,
					useValue: options,
				},
				CaptchaService,
			],
			exports: [CaptchaService],
			global: true,
		}
	}

	public static forRootAsync(options: CaptchaAsyncOptions): DynamicModule {
		return {
			module: CaptchaModule,
			imports: [HttpModule, ...(options.imports || [])],
			providers: [
				{
					provide: CaptchaOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject || [],
				},
				CaptchaService,
			],
			exports: [CaptchaService],
			global: true,
		}
	}
}
