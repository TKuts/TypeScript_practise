import "reflect-metadata";

interface ICuboid {
  width: number;
  length: number;
  height: number;
  calcArea: (multiply?: number) => number;
  calcVolume: (multiply?: number) => number;
}

@createdAt
class ShippingContainer implements ICuboid {
  @IsInt()
  @Min(1)
  width: number;

  @IsInt()
  @Min(1)
  length: number;

  @IsInt()
  @Min(1)
  @Max(8)
  height: number;

  constructor(width: number, length: number, height: number) {
    this.width = width;
    this.length = length;
    this.height = height;
    validate(this, "width", width);
    validate(this, "length", length);
    validate(this, "height", height);
  }

  @fixLastCalculation("calcArea")
  calcArea(multiply?: number): number {
    return this.width * this.length * (multiply ? multiply : 1);
  }

  @fixLastCalculation("calcVolume")
  calcVolume(multiply?: number) {
    return this.width * this.length * this.height * (multiply ? multiply : 1);
  }
}

// 1. It is necessary to create a class decorator that will record the date of container creation
// In simple words - create a new property createdAt in it with the date of instance creation

// 2. Необходимо создать декораторы IsInt, Min и Max, которые будут валидировать свойства класса
// Применение смотрите в самом классе. При ошибке выполняйте throw new Error
// IsInt проверяет на то, что было передано целое число

// 3. We need to create a method decorator that will create a method each time the method is run
// OR change the contents of the property of the lastCalculation class itself
// As a value to write the string "The last calculation ${method} was ${Date}" into it,
// Where method is the name of the calculation that is passed in when the decorator is called (area or volume)

type ShippingContainerData = {
  createdAt: Date;
  lastCalculation: string;
};

const container = new ShippingContainer(10, 100, 7) as ICuboid & ShippingContainerData;
container.width = 10;
container.height = 5;
console.log(container.calcArea());
console.log(container.lastCalculation);
console.log(container.calcVolume());
console.log(container.lastCalculation);

finalValidate(container);

// Exercise 1
function createdAt<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    createdAt = new Date();
  };
}

// Exercise 3
function fixLastCalculation(method: string) {
  return (
    target: Object,
    propertyKet: string | symbol,
    description: PropertyDescriptor
  ): PropertyDescriptor | void => {
    const oldValue = description.value;

    description.value = function (this: any, ...args: any[]) {
      this.lastCalculation = `Последний подсчет ${method} был ${new Date()}`;
      return oldValue.apply(this, args);
    };
  };
}

function IsInt() {
  return function (target: Object, propertyKey: string | symbol) {
    Reflect.defineMetadata("IsInt", true, target, propertyKey);
  };
}

function Min(limit: number) {
  return function (target: Object, propertyKey: string | symbol) {
    Reflect.defineMetadata("Min", limit, target, propertyKey);
  };
}

function Max(limit: number) {
  return function (target: Object, propertyKey: string | symbol) {
    Reflect.defineMetadata("Max", limit, target, propertyKey);
  };
}

function validate(target: Object, propertyKey: string, value: any) {
  if (
    Reflect.getMetadata("IsInt", target, propertyKey) &&
    (!Number.isInteger(value) || value !== parseInt(value))
  ) {
    throw new Error(`Value ${propertyKey} - not an integer`);
  }

  if (
    Reflect.hasMetadata("Min", target, propertyKey) &&
    value < Reflect.getMetadata("Min", target, propertyKey)
  ) {
    throw new Error(
      `the minimum value for the property ${propertyKey} should be: ${Reflect.getMetadata(
        "Min",
        target,
        propertyKey
      )}`
    );
  }

  if (
    Reflect.hasMetadata("Max", target, propertyKey) &&
    value > Reflect.getMetadata("Max", target, propertyKey)
  ) {
    throw new Error(
      `The max value for the property ${propertyKey} should be: ${Reflect.getMetadata(
        "Max",
        target,
        propertyKey
      )}`
    );
  }
}

function finalValidate(obj: unknown) {
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    for (let key in obj) {
      validate(obj, key, obj[key as keyof typeof obj]);
    }
  }
}
