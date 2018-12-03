import { Injectable } from "@angular/core";
import { DbTickerProvider } from "../providers/database/dbTicker";
import { Helper } from "../helper/helper";

@Injectable()

export class TickerModel
{
    constructor(private dbTickerProvider : DbTickerProvider,
                private helper : Helper){

    }

    async init(){
        await this.dbTickerProvider.init();
    }

    async saveData(data){
       var isInserted = await this.dbTickerProvider.saveTicker(data['TickerId'], data['Name'], data['Texts'], data['Priority'], data['Active'], 
                                    data['ActivationDate'],  data['DeactivationDate'],  data['IsDelete']);
        return isInserted;
    }

    async updateData(data){
        var isUpdated = await this.dbTickerProvider.updateTicker(data['Id'], data['TickerId'], data['Name'], data['Texts'], data['Priority'], data['Active'], 
        data['ActivationDate'],  data['DeactivationDate'],  data['IsDelete']);
        return isUpdated;
    }

    async isDataExist(tickerIdId){
        var isExist = false;
        var data = await this.dbTickerProvider.getTickerByTickerId(tickerIdId);
        if(data)
            isExist = true;
        return isExist;
    }

    async saveOrUpdateBatch(datas){
        var newDatas = [];
        for (var i = 0 ; datas.length ; i++){
            var newData = this.createObject(null, datas['ID'], datas['Name'], datas['Text'], datas['Priority']
                                     , datas['Active'], datas['ActivationDate'], datas['DeactivationDate'], datas['IsDelete']);
            newDatas.push(newData);
        }
        await this.dbTickerProvider.saveOrUpdateTickerBatch(newDatas);
    }

    async getDataByTickerId(tickerId){
        var data = await this.dbTickerProvider.getTickerByTickerId(tickerId);
        //console.log(data);
        return data;
    }

    createObject(id, tickerId, name, texts, priority, active ,
                activationDate, deactivationDate, isDelete ){
        var object = this.dbTickerProvider.createObject(id, tickerId, name, texts, priority, active ,
            activationDate, deactivationDate, isDelete );

        return object;
    }

    async getData(){
        var data = await this.dbTickerProvider.getTicker();
        //console.log(data);
        return data;
    }

    async deleteTicker(tickerIdId){
        var isDeleted = await this.dbTickerProvider.deleteTicker(tickerIdId);
        return isDeleted;
    }

    isValidToShow(data) : boolean{
        var isValid = false
        if(data['DeactivationDate'] != "F"){
            if(this.helper.getLocalCurrentDate() <= this.helper.getDateFromStrings(data['DeactivationDate'].toString(), 23, 59, 59)
            && this.helper.getLocalCurrentDate() >= this.helper.getDateFromStrings(data['ActivationDate'].toString())){
                if(this.helper.getCurrentIntTime(this.helper.getLocalCurrentDate()) <= this.helper.getIntTime(data['EndTime']) 
                && this.helper.getCurrentIntTime(this.helper.getLocalCurrentDate()) >= this.helper.getIntTime(data['StartTime'])){
                    isValid = true;
                }
            }
        }
        return isValid;
    }
}