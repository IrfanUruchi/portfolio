import { describe, expect, it, vi } from 'vitest';
import { fetchPublicStats, getHuggingFaceAll, PublicStatsError } from './publicStats';

const reply = (body: unknown, headers?: HeadersInit, status = 200) => new Response(JSON.stringify(body), { headers, status });

describe('public statistics providers', () => {
  it('follows Hugging Face Link pagination', async () => {
    const fetcher = vi.fn().mockResolvedValueOnce(reply([{ id: 'first' }], { link: '<https://huggingface.co/api/models?cursor=next>; rel="next"' })).mockResolvedValueOnce(reply([{ id: 'second' }]));
    await expect(getHuggingFaceAll(fetcher, 'https://huggingface.co/api/models?author=Irfanuruchi')).resolves.toHaveLength(2);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('keeps provider categories separate', async () => {
    const fetcher = vi.fn((url: string) => {
      if (url.includes('api.github')) return Promise.resolve(reply({ public_repos: 59 }));
      if (url.includes('/models')) return Promise.resolve(reply([{ id: 'm1' }, { id: 'm2' }]));
      if (url.includes('/datasets')) return Promise.resolve(reply([{ id: 'd1' }]));
      return Promise.resolve(reply({ results: [{ name: 'image' }], next: null }));
    });
    await expect(fetchPublicStats(fetcher)).resolves.toMatchObject({ github: { publicRepositories: 59 }, huggingFace: { publicModels: 2, publicDatasets: 1 }, dockerHub: { publicRepositories: 1 } });
  });

  it('reports provider and status for an unavailable provider', async () => {
    await expect(fetchPublicStats(vi.fn().mockResolvedValue(reply({}, undefined, 503)))).rejects.toMatchObject({ provider: 'github', phase: 'http', status: 503 });
    expect(new PublicStatsError('github', 'network')).toBeInstanceOf(Error);
  });
});
