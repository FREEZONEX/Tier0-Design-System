/* global React */

function Features() {
  const items = [
    {title:"Source Flow", body:"Connect to devices and systems with real-time protocol translation, all on Node-RED."},
    {title:"Broker", body:"Semantic MQTT models data using topic hierarchies and structured JSON payloads."},
    {title:"Sink", body:"TimescaleDB for time-series values. PostgreSQL for relational data."},
    {title:"Event Flow", body:"Merge payloads and append prompts for LLM-powered optimization."},
  ];
  return (
    <section style={{padding:"100px 40px",background:"#fff",fontFamily:"var(--font-sans)",color:"#050B14"}}>
      <div style={{maxWidth:1040,margin:"0 auto"}}>
        <h2 style={{fontSize:40,fontWeight:500,letterSpacing:"-0.4px",lineHeight:1.1,margin:"0 0 56px",maxWidth:680}}>Four layers, one namespace.</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,rowGap:48}}>
          {items.map(it => (
            <div key={it.title}>
              <div style={{fontSize:22,fontWeight:500,letterSpacing:"-0.28px"}}>{it.title}</div>
              <div style={{fontSize:15,color:"#585C62",lineHeight:1.55,marginTop:8,letterSpacing:"-0.2px",maxWidth:420}}>{it.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Features = Features;
