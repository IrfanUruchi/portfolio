import { describe, expect, it, vi } from 'vitest';
import { getHuggingFaceAll, refresh, updateSnapshot } from './refresh-public-stats.mjs';

const snapshot={updatedAt:'2026-11-22T16:20:00.000Z',github:{publicRepositories:60,lastSuccessAt:'2026-11-22T16:20:00.000Z'},huggingFace:{publicModels:101,publicDatasets:11,lastSuccessAt:'2026-11-22T16:20:00.000Z'},dockerHub:{publicRepositories:20,lastSuccessAt:'2026-11-22T16:20:00.000Z'}};
const reply=(body:unknown,headers?:HeadersInit)=>new Response(JSON.stringify(body),{headers});

describe('statistics snapshot refresh',()=>{
  it('follows Hugging Face pagination',async()=>{const fetcher=vi.fn().mockResolvedValueOnce(reply([{id:'one'}],{link:'<https://huggingface.co/api/models?cursor=next>; rel="next"'})).mockResolvedValueOnce(reply([{id:'two'}]));await expect(getHuggingFaceAll(fetcher,'https://huggingface.co/api/models?author=Irfanuruchi')).resolves.toHaveLength(2)});
  it('does not change the snapshot when verified counts are unchanged',()=>{expect(updateSnapshot(snapshot,{github:60,huggingFaceModels:101,huggingFaceDatasets:11,dockerHub:20},'2026-11-23T00:00:00.000Z')).toEqual({changed:false,snapshot})});
  it('updates every timestamp only when a verified count changes',()=>{const result=updateSnapshot(snapshot,{github:61,huggingFaceModels:101,huggingFaceDatasets:11,dockerHub:20},'2026-11-23T00:00:00.000Z');expect(result).toMatchObject({changed:true,snapshot:{updatedAt:'2026-11-23T00:00:00.000Z',github:{publicRepositories:61}}})});
  it('preserves the file when any provider fails',async()=>{const write=vi.fn();const result=await refresh({fetcher:vi.fn().mockRejectedValue(new Error('offline')),read:vi.fn().mockResolvedValue(JSON.stringify(snapshot)),write,updatedAt:'2026-11-23T00:00:00.000Z'});expect(result).toMatchObject({changed:false,failed:true,snapshot});expect(write).not.toHaveBeenCalled()});
});
