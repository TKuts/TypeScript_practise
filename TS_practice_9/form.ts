interface IForm {
	login: string;
	password: string;
}

const validationData: ValidForm<IForm> = {
	login: { isValid: false, errorMsg: "At least 3 characters" },
	password: { isValid: true },
};

// Необхідно типізувати об'єкт валідації
// Врахуйте, що дані у формі можуть розширюватися і ці поля
// повинні з'явитися і в об'єкті валідації

type ValidForm<T> = {
	[P in keyof T]: { isValid: true } | { isValid: false; errorMsg: string ;};
}

