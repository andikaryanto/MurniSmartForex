import { Injectable } from "@angular/core";
import { DbSmartDisplayCustomerInfoProvider } from "../providers/database/dbSmartDisplayCustomerInfo";

@Injectable()
export class SmartDisplayCustomerInfoModel
{
    constructor(private dbSmartDisplayCustomerInfoProvider : DbSmartDisplayCustomerInfoProvider)
    {

    }

    async init(){
        await this.dbSmartDisplayCustomerInfoProvider.init();
    }

    saveSmartDisplayCustomerInfo(customerInfo){
        this.dbSmartDisplayCustomerInfoProvider.saveSmartDisplayCustomerInfo(customerInfo['PlayerID'][0], 
                                                        customerInfo['CustomerName'][0],
                                                        customerInfo['BranchName'][0],
                                                        customerInfo['BranchAddress'][0],
                                                        customerInfo['ContactPerson'][0],
                                                        customerInfo['Phone'][0],
                                                        customerInfo['MobilePhone'][0],
                                                        customerInfo['Email'][0],
                                                        customerInfo['LastUpdate'][0]);
    }

    async getSmartDisplayCustomerInfo(){
        var data = await this.dbSmartDisplayCustomerInfoProvider.getSmartDisplayCustomerInfo();
        return data;
    }
    
}