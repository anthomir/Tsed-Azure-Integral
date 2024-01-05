import {Res} from '@tsed/common';
import {Controller} from '@tsed/di';
import {PathParams} from '@tsed/platform-params';
import {Get} from '@tsed/schema';
import {sin} from 'mathjs';

@Controller('/numericalintegralservice')
export class HelloWorldController {
	@Get('/:lower/:upper')
	get(
		@PathParams('lower') pathLower: string,
		@PathParams('upper') pathUpper: string,
		@Res() res: Res
	) {
		const lower = parseFloat(pathLower);
		const upper = parseFloat(pathUpper);

		const iterations = [10, 100, 1000, 10000, 100000, 1000000];
		const results: any[] = [];

		iterations.forEach((N) => {
			const delta_x = (upper - lower) / N;
			let result = 0.0;

			for (let i = 0; i < N; i++) {
				const x_i = lower + i * delta_x;
				result += Math.abs(sin(x_i)) * delta_x;
			}

			results.push({N, result});
		});

		res.json(results);
	}
}
