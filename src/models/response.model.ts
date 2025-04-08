export class Response<T>{
    status: number;
    message: string;
    data: T;

    constructor(message: string, status: number, data: T){
        this.status = status;
        this.message = message ;
        this.data = data;
    }
}