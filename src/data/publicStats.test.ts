import snapshot from './publicStats.json';
import { portfolioAudit } from './portfolio';

describe('public statistics snapshot', () => {
  it('keeps platform counts separate without encoding a permanent target', () => {
    expect(snapshot.github.publicRepositories).toBeGreaterThanOrEqual(0);
    expect(snapshot.huggingFace.publicModels).toBeGreaterThanOrEqual(0);
    expect(snapshot.huggingFace.publicDatasets).toBeGreaterThanOrEqual(0);
    expect(snapshot.dockerHub.publicRepositories).toBeGreaterThanOrEqual(0);
  });

  it('uses one shared source for the portfolio audit', () => {
    const values = portfolioAudit.statistics.map(item => item.value);
    expect(values).toEqual(expect.arrayContaining([
      String(snapshot.github.publicRepositories),
      String(snapshot.huggingFace.publicModels),
      String(snapshot.huggingFace.publicDatasets),
      String(snapshot.dockerHub.publicRepositories),
    ]));
  });
});
