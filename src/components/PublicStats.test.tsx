import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PublicStats from './PublicStats';

const apiStats = (cacheStatus: 'fresh' | 'cached' | 'stale') => ({
  updatedAt: '2026-11-22T16:20:00.000Z',
  cacheStatus,
  github: { publicRepositories: 60 },
  huggingFace: { publicModels: 101, publicDatasets: 11 },
  dockerHub: { publicRepositories: 20 },
});

afterEach(() => vi.unstubAllGlobals());

describe('PublicStats', () => {
  it('uses a no-store API request and identifies a provider refresh', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => apiStats('fresh') });
    vi.stubGlobal('fetch', fetcher);
    window.fetch = fetcher;

    render(<PublicStats />);

    expect(screen.getByText(/Build snapshot/)).toBeInTheDocument();
    expect(fetcher).toHaveBeenCalled();
    expect(await screen.findByText(/Live provider data/)).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(fetcher).toHaveBeenCalledWith('/api/public-stats', { cache: 'no-store', headers: { Accept: 'application/json' } });
  });

  it('distinguishes a Function cache response from stale provider data', async () => {
    const fetcher = vi.fn().mockResolvedValueOnce({ ok: true, json: async () => apiStats('cached') }).mockResolvedValueOnce({ ok: true, json: async () => apiStats('stale') });
    vi.stubGlobal('fetch', fetcher);
    window.fetch = fetcher;

    const { unmount } = render(<PublicStats />);
    expect(fetcher).toHaveBeenCalled();
    expect(await screen.findByText(/Cached provider data/)).toBeInTheDocument();
    unmount();
    render(<PublicStats />);
    expect(await screen.findByText(/Stale provider data/)).toBeInTheDocument();
  });
});
