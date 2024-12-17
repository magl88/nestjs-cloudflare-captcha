import { UseGuards } from '@nestjs/common'
import { CloudflareCaptchaGuard } from '../guards/cloudflare-captcha.guard'

export function Turnstile() {
	return UseGuards(CloudflareCaptchaGuard)
}
