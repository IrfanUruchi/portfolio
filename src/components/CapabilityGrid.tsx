const capabilities=[
['AI and Model Engineering','Fine-tuning, quantization, inference, and model deployment.',['Qwen2.5','QLoRA','GGUF','MLX','OpenVINO','CUDA']],
['Distributed Systems','Scheduling, RPC, coordination, recovery, and multi-node execution.',['gRPC','Protocol Buffers','MQTT','SQLite']],
['Edge and Fog Computing','Workload control, telemetry, reconciliation, and local inference.',['Raspberry Pi','MQTT','Docker','CNN','LLMs']],
['Backend and Infrastructure','APIs, queues, storage, networking, and service coordination.',['Python','FastAPI','PostgreSQL','MongoDB','WebRTC']],
['Deployment and Platforms','Containerized deployment across cloud, desktop, and edge environments.',['Docker','Docker Compose','Cloudflare Pages','Linux']],
['Hardware-Aware Engineering','Testing and deployment across ARM64, x86_64, and edge devices.',['ARM64','x86_64','Raspberry Pi','Apple silicon']]
] as const;
export default function CapabilityGrid(){return <div className="cap-grid">{capabilities.map(([title,text,tech],i)=><article key={title}><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{text}</p><ul className="tech-row">{tech.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div>}
