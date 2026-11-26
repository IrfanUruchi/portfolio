import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PublicStats from './PublicStats';

describe('PublicStats', () => {
  it('renders the checked-in snapshot without requesting the runtime API', () => {
    const fetcher = vi.fn();
    vi.stubGlobal('fetch', fetcher);
    render(<PublicStats />);
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.queryByText(/Automatically updated/)).not.toBeInTheDocument();
    expect(fetcher).not.toHaveBeenCalled();
  });
});
