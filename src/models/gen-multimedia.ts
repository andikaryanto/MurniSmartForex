import { Injectable } from "@angular/core";
import { DbMultimediaProvider } from "../providers/database/dbMultimedia";
import { Helper } from "../helper/helper";

@Injectable()

export class MultimediaModel
{
    constructor(private dbMultimediaProvider : DbMultimediaProvider,
                private helper : Helper){

    }

    async init(){
        await this.dbMultimediaProvider.init();
    }

    async saveData(data){
       await this.dbMultimediaProvider.saveMultimedia(data['MultimediaId'], data['Code'],  data['Name'], data['FileName'], data['FileMusic'], data['MultimediaType'],
                                    data['Duration'],  data['Active'],  data['ActivationDate'],  data['DeactivationDate'],   data['DeliveryDate'],data['FileSize'],
                                    data['Checksum'],  data['Path'],  data['IsDeleted'],  data['Priority'],  data['StartTime'],
                                    data['EndTime'],  data['Days'],  data['LocalPath']);
    }

    async updateData(data){
        await this.dbMultimediaProvider.updateMultimedia(data['Id'], data['MultimediaId'], data['Code'],  data['Name'], data['FileName'], data['FileMusic'], data['MultimediaType'],
                            data['Duration'],  data['Active'],  data['ActivationDate'],  data['DeactivationDate'],   data['DeliveryDate'],data['FileSize'],
                            data['Checksum'],  data['Path'],  data['IsDeleted'],  data['Priority'],  data['StartTime'],
                            data['EndTime'],  data['Days'],  data['LocalPath']);
    }

    async isDataExist(multimediaId){
        var isExist = false;
        var data = await this.dbMultimediaProvider.getMultimediaByMultimediaId(multimediaId);
        if(data)
            isExist = true;
        return isExist;
    }

    async getDataByMultimediaId(multimediaId){
        var data = await this.dbMultimediaProvider.getMultimediaByMultimediaId(multimediaId);
        //console.log(data);
        return data;
    }

    createObject(id, multimediaId, code, name, fileName, fileMusic, multimediaType, duration, active ,
                activationDate, deactivationDate, deliveryDate, fileSize, checksum, path, isDeleted ,
                priority, startTime, endTime, days, localPath ){
        var object = this.dbMultimediaProvider.createObject(id, multimediaId, code, name, fileName, fileMusic, multimediaType, duration, active ,
            activationDate, deactivationDate, deliveryDate, fileSize, checksum, path, isDeleted ,
            priority, startTime, endTime, days, localPath);

        return object;
    }

    async getData(){
        var data = await this.dbMultimediaProvider.getMultimedia();
        //console.log(data);
        return data;
    }

    async deleteMultimedia(multimediaId){
        var isDeleted = await this.dbMultimediaProvider.deleteMultimedia(multimediaId);
        return isDeleted;
    }

    async getMultimediaByType(type){
        var newdata = [];
        var data = await this.dbMultimediaProvider.getMultimediaByType(type);
        for(let i = 0 ; i < data.length; i ++){
            if(this.isValidToShow(data[i])){
                newdata.push(data[i]);
            }
        }
        return newdata;
    }

    isValidToShow(data) : boolean {
        var isValid = false

        var dayShow = (data['Days'].toString()).split(",");
        var validDay = false;

        var localDay = this.helper.getLocalCurrentDate().getDay() + 1; // local monday = 1 , server day monday = 2
        if(localDay > 7) 
            localDay = 1;

        for(var i = 0 ; i< dayShow.length; i++){
            if(dayShow[i] == localDay){ 
                validDay = true;
            }
        }

        if(this.helper.getLocalCurrentDate() <= this.helper.getDateFromStrings(data['DeactivationDate'].toString(), 23, 59, 59)
        && this.helper.getLocalCurrentDate() >= this.helper.getDateFromStrings(data['ActivationDate'].toString())){
            if(validDay){
                if(this.helper.getCurrentIntTime(this.helper.getLocalCurrentDate()) <= this.helper.getIntTime(data['EndTime']) 
                && this.helper.getCurrentIntTime(this.helper.getLocalCurrentDate()) >= this.helper.getIntTime(data['StartTime'])){
                    isValid = true;
                }
            }
        }

        return isValid;
    }
}