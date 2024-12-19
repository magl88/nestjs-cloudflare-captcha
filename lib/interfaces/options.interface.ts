import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'
import type { Request } from 'express'

export const TurnstileOptionsSymbol = Symbol('TurnstileOptionsSymbol')

export type TurnstileOptions = {
	secretKey: string
	token: (req: Request | any) => string
	skipIf?:
		| boolean
		| (<Req = unknown>(request: Req) => boolean | Promise<boolean>)
}

export type TurnstileAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<TurnstileOptions>, 'useFactory' | 'inject'>
