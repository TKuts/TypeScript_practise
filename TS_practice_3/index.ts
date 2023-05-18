type ValidAmount = "empty" | number;

// Data structure of the clothing warehouse

interface ClothesWarehouse {
	jackets: ValidAmount;
	hats: ValidAmount;
	socks: ValidAmount;
	pants: ValidAmount;
}

// Data structure of the stationery warehouse

interface StationeryWarehouse {
	scissors: ValidAmount;
	paper: "empty" | boolean;
}

// Data structure of the household appliance warehouse

interface AppliancesWarehouse {
	dishwashers: ValidAmount;
	cookers: ValidAmount;
	mixers: ValidAmount;
}

// general data structure, inherits all the data from the three above
// + adds his

interface TotalWarehouse extends ClothesWarehouse, StationeryWarehouse, AppliancesWarehouse {
	deficit: boolean;
	date: Date;
}

// the main object with all data, must fit the TotalWarehouse format

const totalData: TotalWarehouse = {
	jackets: 5,
	hats: "empty",
	socks: "empty",
	pants: 15,
	scissors: 15,
	paper: true,
	dishwashers: 3,
	cookers: "empty",
	mixers: 14,
	deficit: true,
	date: new Date(),
};

// Implement a function that takes the main object totalData of the desired format
// and always returns a string
// The function should filter the data from the object and leave only those product names that have the value "empty"
// and put them in this line. If there are no such items, another row is returned (see below)

// With this totalData object, the string will look like:
// "We need this items: hats, socks, cookers"
// Goods with a comma, it should not be at the end. Space after the colon, there is no colon at the end of the line.

function printReport(data: TotalWarehouse): string {
	const result: string = Object.entries(data)
		.filter((item) => item[1] === "empty")
		.reduce((res, item) => `${res} ${item[0]},`, "");

	if (result.trim().length) {
		return `We need this items:${result.slice(0, -1)}`;
	} else {
		return "Everything fine";
	}
}

console.log(printReport(totalData));
