interface ICreateTenantBody{
    firstName:string,
    lastName:string,
    mobNo:string,
    email:string,
    password:string,
    companyName:string,
    domain?:string,
}

export { ICreateTenantBody }