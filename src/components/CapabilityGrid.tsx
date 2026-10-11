const capabilities=[
['AI and Model Engineering','Fine-tuning, evaluation, quantization, and multi-runtime publication with explicit model lineage.',['Qwen3','Qwen2.5','QLoRA','PEFT','GGUF']],
['Distributed Systems','Persistent scheduling, typed RPC, worker health, retries, and capability-aware execution.',['gRPC','Protocol Buffers','FastAPI','SQLite']],
['Edge and Fog Computing','Desired-state control, telemetry, recovery, and container workloads across edge nodes.',['MQTT','Docker','Raspberry Pi','Local LLMs']],
['AI Infrastructure','Hardware discovery, runtime selection, model lifecycle, CPU fallback, and multi-GPU planning.',['Python','Docker','llama.cpp','CUDA']],
['Operating Systems','Distribution build pipelines, package profiles, system policy, and virtualized installation checks.',['Linux','Bash','Ubuntu','KDE','QEMU']],
['Hardware-Aware Engineering','Deployment and validation across x86_64, ARM64, CPU, GPU, desktop, and edge environments.',['x86_64','ARM64','NVIDIA','Apple silicon']]
] as const;
export default function CapabilityGrid(){return <div className="cap-grid">{capabilities.map(([title,text,tech],i)=><article key={title}><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{text}</p><ul className="tech-row">{tech.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div>}
