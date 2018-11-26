export interface IDemoSetting
{
    getDemoSetting() : {};
    saveDemoSetting(Id : number, 
        ScreenOrientation: number, 
        UseTicker: number, 
        ImageFolder : string , 
        VideoFolder : string,
        TabularTemplate : number, 
        TabularMaxColumn : number,
        TabularMaxFixedRow : number,
        TabularMulmedType : number,
        TabularFooterText : string,
        TabularMaxDynamicRow : number) : void;
    updateDemoSetting(ScreenOrienttion : number, UseTicker : number, ImageFolder : string , VideoFolder : string) : void;
    createObject(Id : number, 
        ScreenOrientation: number, 
        UseTicker: number, 
        ImageFolder : string , 
        VideoFolder : string,
        TabularTemplate : number, 
        TabularMaxColumn : number,
        TabularMaxFixedRow : number,
        TabularMulmedType : number,
        TabularFooterText : string,
        TabularMaxDynamicRow : number) : {};
    updateDemoSettingColumn(Column : string, Value : string)
}