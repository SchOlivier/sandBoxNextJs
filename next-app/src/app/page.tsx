"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [payload, setPayload] = useState('{"a":21,"b":21}');

  useEffect(() => { fetch("/api/jobs").then(r=>r.json()).then(setJobs); }, []);

  return (
    <main style={{padding:16}}>
      <h1>Étape 1 — Next + Postgres</h1>
      <textarea value={payload} onChange={e=>setPayload(e.target.value)} rows={5} style={{width:"100%"}}/>
      <button onClick={async ()=>{
        await fetch("/api/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:payload});
        setJobs(await (await fetch("/api/jobs")).json());
      }}>Créer un job</button>
      <pre>{JSON.stringify(jobs, null, 2)}</pre>
    </main>
  );
}
