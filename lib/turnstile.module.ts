import { HttpModule } from '@nestjs/axios'
import { type DynamicModule, Global, Module } from '@nestjs/common'
import {
	type TurnstileAsyncOptions,
	type TurnstileOptions,
	TurnstileOptionsSymbol,
} from './interfaces'
import { TurnstileService } from './services'

@Global()
@Module({})
export class TurnstileModule {
	public static forRoot(options: TurnstileOptions): DynamicModule {
		return {
			module: TurnstileModule,
			imports: [HttpModule],
			providers: [
				{
					provide: TurnstileOptionsSymbol,
					useValue: options,
				},
				TurnstileService,
			],
			exports: [TurnstileService],
			global: true,
		}
	}

	public static forRootAsync(options: TurnstileAsyncOptions): DynamicModule {
		return {
			module: TurnstileModule,
			imports: [HttpModule, ...(options.imports || [])],
			providers: [
				{
					provide: TurnstileOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject || [],
				},
				TurnstileService,
			],
			exports: [TurnstileService],
			global: true,
		}
	}
}
