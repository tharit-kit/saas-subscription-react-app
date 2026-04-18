export interface ApiResponse<T>{
    isSuccess: boolean,
    responseCode: string,
    responseDescription: string,
    data: T
}