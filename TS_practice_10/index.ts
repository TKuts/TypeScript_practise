enum TransferStatus {
  Pending = "pending",
  Rejected = "rejected",
  Completed = "completed",
}

enum ErrorMessages {
  NotFound = "Not found: 404",
  NotEnoughSpace = "Not enough space: 507",
  Forbidden = "Forbidden: 403",
}

interface ITransfer {
  path: string;
  data: string[];
  date?: Date;
  start: (p: string, d: string[]) => string;
  stop: (reason: string) => string;
}

interface TransferError {
  message: ErrorMessages;
}

// We need to create a method checkTransferStatus, which checks the status of data transfer
// You can display the data in the console, you can return a string

// You need to create a method that will stop the data transfer
// And return a string with the reason and date of the stop (Date in any format)

// You need to create a method that will return a string containing
// Transmission status and any error message. At your choice, or to be guided by an incoming argument

// The class must implement ITransfer and TransferError
class SingleFileTransfer implements ITransfer, TransferError {
  path: string;
  data: string[];
  date?: Date | undefined;
  message: ErrorMessages;
  transferStatus: TransferStatus;

  constructor(status: TransferStatus) {
    this.transferStatus = status;
  }

  checkTransferStatus(): string {
    return this.transferStatus;
  }
  start(p: string, d: string[]) {
    return "Transfer started";
  }
  stop(reason: string) {
    return `Transfer stopped, reason: ${reason}, Date: ${new Date().toLocaleString()}`;
  }

  makeError(): string {
    return `Status: ${TransferStatus.Rejected}, error message: ${ErrorMessages.Forbidden}`;
  }
}

const transfer = new SingleFileTransfer(TransferStatus.Pending);
console.log(transfer.checkTransferStatus());
console.log(transfer.stop("Test"));
console.log(transfer.makeError());
