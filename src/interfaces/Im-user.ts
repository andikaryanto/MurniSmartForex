
export interface IMUser
{
    //isUserExist() : any;
    createUser(LoginName: string, LoginUse: number, UserId : number , LoggedIn : boolean): void;
    getUser(): {};
    deleteUser() : void;
}