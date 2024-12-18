import { UseGuards } from '@nestjs/common'
import { CaptchaGuard } from '../guards/captcha.guard'

export function Turnstile() {
	return UseGuards(CaptchaGuard)
}
