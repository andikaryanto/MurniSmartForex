
import { IMUser } from '../interfaces/Im-user';
import { DatabaseProvider } from '../providers/database/databases';
import { Injectable } from '@angular/core';
import { LocalStorageProvider } from '../providers/localstorage/localstorage';
@Injectable()
export class MUserModel implements IMUser 
{
    public LoginName? : string;
    public LoginUse? : number;
    public UserId? : string;
    public LooggedIn : boolean;

    constructor(private dbProvider : DatabaseProvider, private localStorageProvider : LocalStorageProvider)
    {

    }

    async getUser()
    {
        //var exist : boolean
        var newData = {};
        try
        {
            let user = await this.dbProvider.getUser();
            newData = this.createObject(user['LoginName'], user['LoginUse'], user['UserId'], user['LoggedIn']);
        }
        catch
        {
            newData = this.createObject(null, null, null, null);
        }
       
        return newData;
        
    }

    createUser(LoginName: string, LoginUse: number, UserId : number , LoggedIn : boolean)
    {
        this.dbProvider.createUser(LoginName, LoginUse, UserId, LoggedIn);
    }

    deleteUser()
    {
        this.dbProvider.deleteUser();
    }

    createObject(LoginName: string, LoginUse: number, UserId : number , LoggedIn : boolean) : {}
    {
        let user = {};
        user = {
            "LoginName" : LoginName,
            "LoginUse" : LoginUse,
            "UserId" : UserId,
            "LoggedIn" : LoggedIn
        }

        return user;
    }

}