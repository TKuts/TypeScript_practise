// Request
// {
//     animal: 'cat' | 'dog' | 'bird',
//     breed: string,
//     sterilized?: string
// }

type Animal = "cat" | "dog" | "bird";

enum AnimalStatus {
  Available = "available",
  NotAvailable = "not available",
}

interface AnimalRequest {
  animal: Animal;
  breed: string;
  sterilized?: string;
}

interface AvailableData extends AnimalRequest {
  location: string;
  age?: number;
}

interface NotAvailableData {
  message: string;
  nextUpdateIn: Date;
}

interface FirstRespons {
  status: AnimalStatus.Available;
  data: AvailableData;
}

// Response #1
// {
//     status: 'available',
//     data: {
//         animal: 'cat' | 'dog' | 'bird',
//         breed: string,
//         sterilized?: string,
//         location: string,
//         age?: number
//     }
// }

interface SecondRespons {
  status: AnimalStatus.NotAvailable;
  data: NotAvailableData;
}

// Response #2
// {
//     status: 'not available',
//     data: {
//         message: string,
//         nextUpdateIn: Date
//     }
// }

type Res = FirstRespons | SecondRespons;

function isAvailable(res: Res): res is FirstRespons {
  if (res.status === AnimalStatus.Available) {
    return true;
  } else {
    return false;
  }
}

function checkAnimalData(animal: Res): AvailableData | string {
  if (isAvailable(animal)) {
    return animal.data;
  } else {
    return `${animal.data}, you can try in ${animal.data.nextUpdateIn}`;
  }
}
