import{projects}from'./projects';

export const portfolioAudit = {
  verifiedAt: '2026-10-11',
  statistics: [
    { value: '57', label: 'Public GitHub repositories' },
    { value: '85', label: 'Hugging Face model repositories' },
    { value: '20', label: 'Published Docker images' },
    { value: String(projects.filter(project=>project.featuredGroup).length), label: 'Featured projects' },
  ],
  methodology: {
    github: 'Public repositories owned by IrfanUruchi; forks and archived repositories excluded. The audited profile contained neither.',
    models: 'Public repositories returned by the Hugging Face models API. Fine-tunes, adapters, conversions, and quantizations remain separate published artifacts.',
    docker: 'Public image repositories under the verified irfanuruchi Docker Hub namespace; tags are not counted as separate images.',
    featured: 'A curated set selected for implementation depth, current relevance, and public evidence; not a count of all substantial work.',
  },
} as const;
