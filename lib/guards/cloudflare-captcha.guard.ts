import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
} from '@nestjs/common'
import type { Request } from 'express'
import {
	type CloudflareCaptchaOptions,
	CloudflareCaptchaOptionsSymbol,
} from '../interfaces/cloudflare-options.interface'
import { CloudflareCaptchaService } from '../services/cloudflare-captcha.service'

@Injectable()
export class CloudflareCaptchaGuard implements CanActivate {
	public constructor(
		@Inject(CloudflareCaptchaOptionsSymbol)
		private readonly options: CloudflareCaptchaOptions,
		private readonly cloudflareCaptchaService: CloudflareCaptchaService
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest() as Request

		const skipIfValue = this.options.skipIf

		const skip =
			typeof skipIfValue === 'function'
				? await skipIfValue(request)
				: !!skipIfValue

		if (skip) {
			return true
		}

		const responseToken = this.options.token(request)

		if (!responseToken) {
			throw new BadRequestException('CAPTCHA token is missing')
		}

		const { success } =
			await this.cloudflareCaptchaService.validateToken(responseToken)

		if (!success) {
			throw new BadRequestException('Invalid CAPTCHA token')
		}

		return success
	}
}
