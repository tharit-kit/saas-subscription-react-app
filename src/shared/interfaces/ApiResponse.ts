export interface ApiResponse<T>{
    ResponseCode: string,
    ResponseDescription: string,
    Data: T
}