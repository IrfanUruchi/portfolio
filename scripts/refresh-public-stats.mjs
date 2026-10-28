import { readFile, writeFile } from 'node:fs/promises';

const username = 'IrfanUruchi';
const hfUser = 'Irfanuruchi';
const dockerUser = 'irfanuruchi';
const headers = { 'User-Agent': 'irfan-uruchi-portfolio-stats/1.0', Accept: 'application/json' };
const now = () => new Date().toISOString();

async function getJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

async function getAll(url, key = '') {
  const items = [];
  for (let page = 1; ; page += 1) {
    const separator = url.includes('?') ? '&' : '?';
    const data = await getJson(`${url}${separator}page=${page}&limit=100`);
    const pageItems = Array.isArray(data) ? data : data[key] || [];
    items.push(...pageItems);
    if (pageItems.length < 100) return items;
  }
}

async function refresh() {
  const previous = JSON.parse(await readFile('src/data/publicStats.json', 'utf8'));
  const refreshedAt = now();
  const next = structuredClone(previous);
  next.updatedAt = refreshedAt;
  try { const profile = await getJson(`https://api.github.com/users/${username}`); if (!Number.isInteger(profile.public_repos)) throw new Error('GitHub public_repos was not an integer'); next.github = { publicRepositories: profile.public_repos, lastSuccessAt: refreshedAt }; } catch (error) { console.error(`GitHub refresh failed; retaining ${next.github.lastSuccessAt}: ${error.message}`); }
  try { const [models, datasets] = await Promise.all([getAll(`https://huggingface.co/api/models?author=${hfUser}`), getAll(`https://huggingface.co/api/datasets?author=${hfUser}`)]); next.huggingFace = { publicModels: models.length, publicDatasets: datasets.length, lastSuccessAt: refreshedAt }; } catch (error) { console.error(`Hugging Face refresh failed; retaining ${next.huggingFace.lastSuccessAt}: ${error.message}`); }
  try { const repositories = await getAll(`https://hub.docker.com/v2/repositories/${dockerUser}/?page_size=100`, 'results'); next.dockerHub = { publicRepositories: repositories.length, lastSuccessAt: refreshedAt }; } catch (error) { console.error(`Docker Hub refresh failed; retaining ${next.dockerHub.lastSuccessAt}: ${error.message}`); }
  await writeFile('src/data/publicStats.json', `${JSON.stringify(next, null, 2)}\n`);
  console.log(JSON.stringify(next));
}

refresh().catch(error => { console.error(error); process.exitCode = 1; });
