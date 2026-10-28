import{projects}from'./projects';
import snapshot from './publicStats.json';

export const portfolioAudit = {
  verifiedAt: snapshot.updatedAt,
  statistics: [
    { value: String(snapshot.github.publicRepositories), label: 'Public GitHub repositories' },
    { value: String(snapshot.huggingFace.publicModels), label: 'Hugging Face model repositories' },
    { value: String(snapshot.huggingFace.publicDatasets), label: 'Hugging Face datasets' },
    { value: String(snapshot.dockerHub.publicRepositories), label: 'Public Docker repositories' },
    { value: String(projects.filter(project=>project.featuredGroup).length), label: 'Featured projects' },
  ],
  methodology: {
    github: 'GitHub profile public_repos count for repositories visible to the public profile; this follows GitHub’s own profile metric and does not apply a second fork filter.',
    models: 'Public repositories returned by the Hugging Face models API. Fine-tunes, adapters, conversions, and quantizations remain separate published artifacts.',
    datasets: 'Public repositories returned by the Hugging Face datasets API; files, rows, downloads, and model references are not counted.',
    docker: 'Public image repositories under the verified irfanuruchi Docker Hub namespace; tags are not counted as separate repositories.',
    featured: 'A curated set selected for implementation depth, current relevance, and public evidence; not a count of all substantial work.',
  },
} as const;
