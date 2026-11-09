/* global React */

function Pricing() {
  const plans = [
    {name:"Community", price:"$0", features:["Namespace & broker","Time-series & relational sink","Docker deploy","Apache 2.0"], cta:"Clone on GitHub", ctaKind:"secondary"},
    {name:"Team", price:"$499", priceSub:"/ month", features:["Everything in Community","LLM event flows","Managed upgrades","Up to 10 users"], cta:"Start free trial", ctaKind:"primary", featured:true},
    {name:"Enterprise", price:"Custom", features:["Everything in Team","SSO & audit logs","Dedicated SLA","On-prem installation"], cta:"Contact sales", ctaKind:"brand"},
  ];
  const CTA = ({kind,children}) => {
    const base = {border:0,padding:"12px 18px",borderRadius:4,fontWeight:500,fontSize:14,letterSpacing:"-0.2px",cursor:"pointer",width:"100%",fontFamily:"var(--font-sans)"};
    if (kind==="primary") return <button style={{...base,background:"#CCF368",color:"#333"}}>{children}</button>;
    if (kind==="brand") return <button style={{...base,background:"#050B14",color:"#B2ED1D"}}>{children}</button>;
    return <button style={{...base,background:"transparent",color:"#050B14",border:"1px solid #CCC"}}>{children}</button>;
  };
  return (
    <section style={{padding:"100px 40px",background:"#fff",fontFamily:"var(--font-sans)",color:"#050B14"}}>
      <div style={{maxWidth:1040,margin:"0 auto"}}>
        <h2 style={{fontFamily:"var(--font-heading)",fontSize:46,fontWeight:700,letterSpacing:"-0.04em",lineHeight:1.08,margin:"0 0 56px"}}>Pricing.</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
          {plans.map(p => (
            <div key={p.name} style={{background:"#fff",border:p.featured?"1px solid #A7CF3A":"1px solid #E2E6DE",borderRadius:4,padding:28,display:"flex",flexDirection:"column",gap:20}}>
              <div>
                <div style={{fontSize:14,color:"#585C62",letterSpacing:"-0.2px"}}>{p.name}</div>
                <div style={{display:"flex",alignItems:"baseline",gap:4,marginTop:8}}>
                  <div style={{fontSize:32,fontWeight:500,letterSpacing:"-0.6px"}}>{p.price}</div>
                  {p.priceSub && <div style={{fontSize:13,color:"#ACAEB1"}}>{p.priceSub}</div>}
                </div>
              </div>
              <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:10,flex:1}}>
                {p.features.map(f => (
                  <li key={f} style={{display:"flex",alignItems:"center",gap:10,fontSize:14,color:"#050B14",letterSpacing:"-0.2px"}}>
                    <svg width="14" height="14" viewBox="0 0 10 10" style={{flexShrink:0}}><path d="M1.5 5L4.2 7.5L8.5 2.5" stroke="#73B200" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <CTA kind={p.ctaKind}>{p.cta}</CTA>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Pricing = Pricing;
