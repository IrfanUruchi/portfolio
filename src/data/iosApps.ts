export type IOSApp={slug:string;name:string;shortDescription:string;description:string;appStore?:string;github?:string;icon?:string};

export const iosApps:IOSApp[]=[
  {slug:'engtoolbox',name:'EngToolBox',shortDescription:'Offline engineering utilities, reference notes, focus timers, and private wellbeing tools.',description:'EngToolBox 2.0 brings practical calculators, reference notes, focus timers, and private wellbeing tools together in one offline-first app.',appStore:'https://apps.apple.com/us/app/engtoolbox/id6615082500'},
  {slug:'unitengconverter',name:'UnitEngConverter',shortDescription:'An iOS application by Irfan Uruçi.',description:'A dedicated portfolio page is provided for UnitEngConverter. Additional public product details are not documented in the existing portfolio.',},
  {slug:'smart-study-planner',name:'Smart Study Planner',shortDescription:'An iOS application by Irfan Uruçi.',description:'A dedicated portfolio page is provided for Smart Study Planner. Additional public product details are not documented in the existing portfolio.',},
  {slug:'playaiground',name:'PlayAIground',shortDescription:'An iOS application by Irfan Uruçi.',description:'A dedicated portfolio page is provided for PlayAIground. Additional public product details are not documented in the existing portfolio.',},
];

export const getIOSApp=(slug:string)=>iosApps.find(app=>app.slug===slug);
