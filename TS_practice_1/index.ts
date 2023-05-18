const currRate: string = "1.05";

const fetchCurr = (response: string): number => {
	const data: number = JSON.parse(response);
	return data;
};

function transferEurToUsd(available: boolean, amount: number, commission: number): void {
	if (available) {
		let res: number = fetchCurr(currRate) * amount * commission;
		console.log(res);
		// Або запис в елемент на сторінці замість консолі
	} else {
		console.log("The exchange is not available right now");
	}
}

transferEurToUsd(true, 500, 1.05);
