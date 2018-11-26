import { MUserProfileModel } from '../models/m-userprofilemodel'
import { MUserprofileProvider } from '../providers/m-userprofile/m-userprofile'
export interface IMUserProfile
{
    createNewData(userProfileId : number,
        userId : number,
        name : string,
        bio : string,
        email : string,
        gender : number,
        phone : string,
        photo : any) : MUserProfileModel;

    createObject(userProfileId : number,
        userId : number,
        name : string,
        bio : string,
        email : string,
        gender : number,
        phone : string,
        photo : any,
        photoBase64: any) : {};

    loadDataByUserId(userId: number) : {};

    addData(model) : void;
        
}
