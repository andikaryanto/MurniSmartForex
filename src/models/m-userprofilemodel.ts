import { IMUserProfile } from '../interfaces/Im-userProfile'
import { MUserprofileProvider } from '../providers/m-userprofile/m-userprofile'
import { Injectable } from '@angular/core';

// import { HttpClient } from '@angular/common/http';
// import { Http, RequestOptions, Headers } from '@angular/http';
@Injectable()
export class MUserProfileModel implements IMUserProfile
{
    public UserProfileId? : number;
    public UserId? : number;
    public Name? : string;
    public Bio? : string;
    public Email? : string;
    public Gender? : number;
    public Phone? : string;
    public Photo? : any;

    //private newData = {};
    //userProfile : any;
    //public muserProvider : MUserprofileProvider;  
    public constructor(public muserProvider : MUserprofileProvider)
    {}

    public createNewData(userProfileId : number,
        userId : number,
        name : string,
        bio : string,
        email : string,
        gender : number,
        phone : string,
        photo : any)
    {
         let newData : any;
        // newData.UserProfileId = userProfileId;
        // newData.UserId = userId;
        // newData.Bio = bio;
        // newData.Email = email;
        // newData.Gender = gender;
        // newData.Phone = phone;
        // newData.Photo = photo;

        return newData;
    }

    async loadDataByUserId(UserId : number)
    {
        var newData = {};
        try
        {
            let data = await this.muserProvider.getUserProfile(UserId); 
            newData = this.createObject(data['UserProfilId'],UserId , data['Name'], data['Bio'], data['Email'], data['Gender'],data['Phone'], data['Photo'], null);
        }
        catch(err)
        {
            newData = this.createObject(0, UserId, null ,null, null, null, null, null, null);
            console.log(newData);
        }
        // .then(data=>
        // {
        //     newData = this.createObject(data['UserProfilId'],UserId , data['Name'], data['Bio'], data['Email'], data['Gender'],data['Phone'], data['Photo'], null);
        // })
        // .catch(error =>
        // {
        //     console.log("Here Bosque");
        //     //newData = this.createObject(data['UserProfilId'],UserId , data['Name'], data['Bio'], data['Email'], data['Gender'],data['Phone'], data['Photo'], null);
        // });
        //console.log(datas);
       

        return newData;       
    }

    addData(model)
    {
        this.muserProvider.addUserProfile(model);
    }

    public createObject(userProfileId? : number,
        userId? : number,
        name? : string,
        bio? : string,
        email? : string,
        gender? : number,
        phone? : string,
        photo? : string,
        photoBase64? : string)
    {
        //let newData = new MUserModel();
        //newData.Name.toString()
        //onsole.log(photo);
        if(photo !== null)
        {
            photoBase64 = 'data:image/*;base64,' + photo;
        }
        else{
            photoBase64 = 'assets/avatar/avatarnull.png';
        }
        let newData = {};
    
        var object = {
            "UserProfilId" : userProfileId,
            "UserId" : userId,
            "Name" : name,
            "Bio" : bio,
            "Email" : email,
            "Gender" : gender,
            "Phone" : phone,
            "Photo" : photo,
            "PhotoBase64" : photoBase64
        }
        newData = object;
        //console.log(object);
        return newData;
    }

    
}