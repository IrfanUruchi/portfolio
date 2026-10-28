export type IOSApp={slug:string;name:string;shortDescription:string;description:string;appStore?:string;github?:string;icon?:string};

export const iosApps:IOSApp[]=[
  {slug:'engtoolbox',name:'EngToolBox',shortDescription:'Offline engineering utilities, reference notes, focus timers, and private wellbeing tools.',description:'EngToolBox 2.0 brings practical calculators, reference notes, focus timers, and private wellbeing tools together in one offline-first app.',appStore:'https://apps.apple.com/us/app/engtoolbox/id6615082500'},
  {slug:'unitengconverter',name:'UnitEngConverter',shortDescription:'An iOS app for unit conversions and engineering calculations.',description:'An iOS app for unit conversions and engineering calculations.',appStore:'https://apps.apple.com/app/id6651829579'},
  {slug:'smart-study-planner',name:'Smart Study Planner',shortDescription:'An iOS study planner with task management, Pomodoro timers, reminders and progress tracking.',description:'An iOS study planner with task management, Pomodoro timers, reminders and progress tracking.',appStore:'https://apps.apple.com/app/id6740488006',github:'https://github.com/IrfanUruchi/Smart-Study-Planner'},
  {slug:'playaiground',name:'PlayAIground',shortDescription:'An offline iOS app using a local GPT-2 model, with simple utilities for jokes, coin flips and date/time information.',description:'An offline iOS app using a local GPT-2 model, with simple utilities for jokes, coin flips and date/time information.',appStore:'https://apps.apple.com/app/id6751442927'},
];

export const getIOSApp=(slug:string)=>iosApps.find(app=>app.slug===slug);
