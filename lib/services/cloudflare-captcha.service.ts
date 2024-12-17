import { HttpService } from '@nestjs/axios'
import {
	Inject,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common'
import { catchError, firstValueFrom } from 'rxjs'
import { DEFAULT_URL } from '../cloudflare-captcha.constants'
import {
	type CloudflareCaptchaOptions,
	CloudflareCaptchaOptionsSymbol,
} from '../interfaces/cloudflare-options.interface'

@Injectable()
export class CloudflareCaptchaService {
	private readonly secretKey: string
	private readonly apiUrl: string

	public constructor(
		@Inject(CloudflareCaptchaOptionsSymbol)
		private readonly options: CloudflareCaptchaOptions,
		private readonly httpService: HttpService
	) {
		this.secretKey = this.options.secretKey
		this.apiUrl = DEFAULT_URL
	}

	public async validateToken(token: string) {
		const { data } = await firstValueFrom(
			this.httpService
				.post(`${this.apiUrl}siteverify`, {
					response: token,
					secret: this.secretKey,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				})
				.pipe(
					catchError(error => {
						throw new InternalServerErrorException(
							`Failed turnstile verification: ${error}`
						)
					})
				)
		)

		return data
	}
}
