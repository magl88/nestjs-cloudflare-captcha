import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'

export const CloudflareCaptchaOptionsSymbol = Symbol()

export type CloudflareCaptchaOptions = {
	secretKey: string
	token: (req) => string
	skipIf?:
		| boolean
		| (<Req = unknown>(request: Req) => boolean | Promise<boolean>)
}

export type CloudflareCaptchaAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<CloudflareCaptchaOptions>, 'useFactory' | 'inject'>
