/* global React */

function Hero() {
  return (
    <section style={{
      background:"#050B14",color:"#fff",padding:"100px 40px 110px",
      backgroundImage:"radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)",
      backgroundSize:"16px 16px",
    }}>
      <div style={{maxWidth:1040,margin:"0 auto",fontFamily:"var(--font-body)"}}>
        <div style={{fontFamily:"var(--font-mono)",fontSize:10,fontWeight:500,letterSpacing:"0.04em",textTransform:"uppercase",color:"#A7CF3A",marginBottom:18}}>
          Unified namespace
        </div>
        <h1 style={{fontFamily:"var(--font-heading)",fontWeight:700,fontSize:76,lineHeight:1,letterSpacing:"-0.05em",margin:"0 0 20px",color:"#fff",maxWidth:820}}>
          A semantic <span style={{color:"#A7CF3A"}}>namespace</span><br/>for industrial data.
        </h1>
        <p style={{fontSize:18,lineHeight:1.5,letterSpacing:"-0.2px",color:"#CDCED0",maxWidth:620,margin:0}}>
          Tier0 is the open-source Unified Namespace platform — protocol translation, semantic MQTT, time-series and relational sink, on infrastructure you control.
        </p>
        <div style={{display:"flex",gap:12,marginTop:36}}>
          <button style={{background:"#B2ED1D",color:"#050B14",border:0,padding:"14px 22px",borderRadius:4,fontFamily:"var(--font-sans)",fontWeight:500,fontSize:15,letterSpacing:"-0.2px",cursor:"pointer"}}>Try live demo</button>
          <button style={{background:"transparent",color:"#B2ED1D",border:"1px solid #B2ED1D",padding:"14px 22px",borderRadius:4,fontFamily:"var(--font-sans)",fontWeight:500,fontSize:15,letterSpacing:"-0.2px",cursor:"pointer"}}>View on GitHub</button>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
