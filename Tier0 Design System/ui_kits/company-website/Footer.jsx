/* global React */

function Footer() {
  const col = (title, links) => (
    <div>
      <div style={{fontSize:12,color:"#585C62",letterSpacing:"-0.2px",marginBottom:14}}>{title}</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {links.map(l => <a key={l} style={{color:"#CDCED0",textDecoration:"none",fontSize:14,letterSpacing:"-0.2px"}}>{l}</a>)}
      </div>
    </div>
  );
  return (
    <footer style={{background:"#050B14",color:"#fff",padding:"56px 40px 32px",fontFamily:"var(--font-sans)"}}>
      <div style={{maxWidth:1040,margin:"0 auto",display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 1fr",gap:40}}>
        <div>
          <img src="../../assets/tier0-logo-lime.svg" alt="Tier0" style={{height:24,display:"block"}}/>
        </div>
        {col("Platform",["Namespace","Broker","Source Flow","Sink"])}
        {col("Resources",["Docs","GitHub","Community"])}
        {col("Company",["FREEZONEX","Contact","License"])}
      </div>
      <div style={{maxWidth:1040,margin:"56px auto 0",paddingTop:20,borderTop:"1px solid rgba(255,255,255,.08)",fontSize:12,color:"#585C62",letterSpacing:"-0.2px"}}>
        © 2026 FREEZONEX
      </div>
    </footer>
  );
}

window.Footer = Footer;
