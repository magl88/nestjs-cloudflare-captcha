import { UseGuards } from '@nestjs/common'
import { TurnstileGuard } from '../guards'

export function Turnstile() {
	return UseGuards(TurnstileGuard)
}
