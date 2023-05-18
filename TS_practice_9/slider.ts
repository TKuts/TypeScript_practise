interface ISlider {
	container?: string;
	numberOfSlides?: number;
	speed?: 300 | 500 | 700;
	direction?: "horizontal" | "vertical";
	dots?: boolean;
	arrows?: boolean;
	animationName?: string;
}

function createSlider({
	container = "",
	numberOfSlides = 1,
	speed = 300,
	direction = "horizontal",
	dots = true,
	arrows = true,
}: ISlider = {}): void {
	console.log(container, numberOfSlides, speed, direction, dots, arrows);
}

createSlider();

const customSliderOptions = {
	container: "id",
	numberOfSlides: 4,
	speed: 1100,
	direction: "horizontal",
	dots: true,
	arrows: true,
};

function createCustomSlider(options: CustomSloder): void {
	if ("container" in options) {
		console.log(options);
	}
}


// Необхідно типізувати об'єкт налаштувань, який буде залежний
// від інтерфейсу ISlider
// Усі поля в ньому обов'язкові для заповнення

type NewCustomSlider = Required<Omit<ISlider, "animationName" | "speed">> 

interface CustomSloder extends NewCustomSlider{ 
	speed: number;
}

