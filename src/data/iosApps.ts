import appStoreMetadata from './appStoreMetadata.json';

type AppStoreRelease={appStoreId:string;country:string;version:string|null;lastSuccessAt:string|null};
const appStoreReleases:Record<string,AppStoreRelease>=appStoreMetadata;
export type IOSApp={slug:string;name:string;shortDescription:string;description:string;appStore?:string;appStoreMetadataKey?:string;github?:string;icon?:string};

export const iosApps:IOSApp[]=[
  {slug:'engtoolbox',name:'EngToolBox',shortDescription:'Offline engineering utilities, reference notes, focus timers, and private wellbeing tools.',description:'EngToolBox 2.0 brings practical calculators, reference notes, focus timers, and private wellbeing tools together in one offline-first app.',appStore:'https://apps.apple.com/us/app/engtoolbox/id6615082500'},
  {slug:'unitengconverter',name:'UnitEngConverter',shortDescription:'An iOS app for unit conversions and engineering calculations.',description:'An iOS app for unit conversions and engineering calculations.',appStore:'https://apps.apple.com/app/id6651829579'},
  {slug:'smart-study-planner',name:'Smart Study Planner',shortDescription:'An intelligent study planner with reviewable schedules, focus sessions, and productivity insights.',description:'Smart Study Planner V2.0 turns tasks and natural-language planning into reviewable study schedules while protecting your availability and breaks.',appStoreMetadataKey:'smart-study-planner',github:'https://github.com/IrfanUruchi/Smart-Study-Planner'},
  {slug:'playaiground',name:'PlayAIground',shortDescription:'An offline iOS app using a local GPT-2 model, with simple utilities for jokes, coin flips and date/time information.',description:'An offline iOS app using a local GPT-2 model, with simple utilities for jokes, coin flips and date/time information.',appStore:'https://apps.apple.com/app/id6751442927'},
];

export const getIOSApp=(slug:string)=>iosApps.find(app=>app.slug===slug);

export const getAppStoreUrl=(app:IOSApp)=>{const release=app.appStoreMetadataKey?appStoreReleases[app.appStoreMetadataKey]:undefined;return app.appStore??(release?`https://apps.apple.com/${release.country}/app/id${release.appStoreId}`:undefined)};
export const getAppStoreRelease=(app:IOSApp)=>app.appStoreMetadataKey?appStoreReleases[app.appStoreMetadataKey]:undefined;
