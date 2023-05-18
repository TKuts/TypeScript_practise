const fitnessClubCenter: FitnessClub = {
	clubName: "Fitness club Center",
	location: "central ave. 45, 5th floor",
	classes: [
		{
			name: "yoga",
			startsAt: "8:00 AM",
			duration: 60,
		},
		{
			name: "trx",
			startsAt: "11:00 AM",
			duration: 45,
		},
		{
			name: "swimming",
			startsAt: "3:00 PM",
			duration: 70,
		},
	],
	futureClasses: [
		{
			name: "boxing",
			willStartsAt: "6:00 PM",
			duration: 40,
		},
		{
			name: "breath training",
			willStartsAt: "8:00 PM",
			duration: 30,
		},
	],
	currClients: [
		{
			name: "John Smith",
			age: "-",
			gender: "male",
			timeLeft: "1 month",
		},
		{
			name: "Alise Smith",
			age: 35,
			gender: "female",
			timeLeft: "3 month",
		},
		{
			name: "Ann Sonne",
			age: 24,
			gender: "female",
			timeLeft: "5 month",
		},
	],
	exClients: [
		{
			name: "Tom Smooth",
			age: 50,
			gender: "male",
			makeCallFor: new Date("2023-08-12"),
		},
	],
	futureClients: [
		{
			name: "Maria",
			makeCallFor: new Date("2023-07-10"),
		},
	],
};


// Необхідно типізувати цей великий об'єкт
// Властивість futureClasses має бути залежно від classes за типом
// Властивості exClients і futureClients теж мають бути в залежності від currClients
// АБО всі три залежать від спільного батька

// Простими словами: під час додавання властивості в цільовий об'єкт вони мають бути
// автоматично додані в залежні (відразу підказка від TS)


interface FitnessClass {
	name: string,
	startsAt: string,
	duration: number,
}

interface FutureClass extends Omit<FitnessClass, "startsAt"> {
	willStartsAt: string,
}

interface Client {
	name: string,
	age: string | number,
	gender: "female" | "male",
	timeLeft: string,
	makeCallFor: Date,
}

type CurrClient = Omit<Client, "makeCallFor"> ;
type ExClient =  Omit<Client, "timeLeft"> ;
type FutureClient = Pick<Client, "name" | "makeCallFor"> 

interface FitnessClub {
	clubName: string,
	location: string,
	classes: FitnessClass[],
	futureClasses: FutureClass[],
	currClients: CurrClient[],
	exClients: ExClient[],
	futureClients: FutureClient[]
}

