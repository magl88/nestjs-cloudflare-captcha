import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'

export const CaptchaOptionsSymbol = Symbol('CaptchaOptionsSymbol')

export type CaptchaOptions = {
	secretKey: string
	token: (req) => string
	skipIf?:
		| boolean
		| (<Req = unknown>(request: Req) => boolean | Promise<boolean>)
}

export type CaptchaAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<CaptchaOptions>, 'useFactory' | 'inject'>
