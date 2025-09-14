interface IApiSuccessRes{
    status: boolean;
    statusCode: number;
    message: string;
    data?:any;
    total:number
}

class ApiSuccessResponse implements IApiSuccessRes {
    status: boolean;
    statusCode:number;
    message:string;
    data: any;
    total:number;

    constructor(statusCode:number, message:string, data:any = null, total:number = 0){
        this.status = true;
        this.statusCode = statusCode;
        this.message = message;
        this.total = total;
        this.data = data ?? null;
    }
}

export default ApiSuccessResponse;