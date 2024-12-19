import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
} from '@nestjs/common'
import type { Request } from 'express'
import {
	type TurnstileOptions,
	TurnstileOptionsSymbol,
} from '../interfaces/options.interface'
import { TurnstileService } from '../services'

@Injectable()
export class TurnstileGuard implements CanActivate {
	public constructor(
		@Inject(TurnstileOptionsSymbol)
		private readonly options: TurnstileOptions,
		private readonly TurnstileService: TurnstileService
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
			throw new BadRequestException('TURNSTILE token is missing')
		}

		const { success } =
			await this.TurnstileService.validateToken(responseToken)

		if (!success) {
			throw new BadRequestException('Invalid TURNSTILE token')
		}

		return success
	}
}
