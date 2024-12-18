import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
} from '@nestjs/common'
import type { Request } from 'express'
import {
	type CaptchaOptions,
	CaptchaOptionsSymbol,
} from '../interfaces/options.interface'
import { CaptchaService } from '../services/captcha.service'

@Injectable()
export class CaptchaGuard implements CanActivate {
	public constructor(
		@Inject(CaptchaOptionsSymbol)
		private readonly options: CaptchaOptions,
		private readonly CaptchaService: CaptchaService
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
			await this.CaptchaService.validateToken(responseToken)

		if (!success) {
			throw new BadRequestException('Invalid CAPTCHA token')
		}

		return success
	}
}
