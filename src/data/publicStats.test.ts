import snapshot from './publicStats.json';
import { portfolioAudit } from './portfolio';

describe('public statistics snapshot', () => {
  it('keeps platform counts separate and current', () => {
    expect(snapshot.github.publicRepositories).toBe(59);
    expect(snapshot.huggingFace.publicModels).toBe(87);
    expect(snapshot.huggingFace.publicDatasets).toBe(10);
    expect(snapshot.dockerHub.publicRepositories).toBe(20);
  });

  it('uses one shared source for the portfolio audit', () => {
    const values = portfolioAudit.statistics.map(item => item.value);
    expect(values).toEqual(expect.arrayContaining(['59', '87', '10', '20']));
  });
});
