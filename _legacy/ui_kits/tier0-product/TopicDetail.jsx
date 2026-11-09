/* global React, Icon */

function TopicDetail({ topicKey }) {
  const meta = {
    "cnc-01": { path:"factory/workshopA/equipment/CNC/01", type:"Time-series", rate:"24 Hz", status:"Live" },
    "cnc-02": { path:"factory/workshopA/equipment/CNC/02", type:"Time-series", rate:"24 Hz", status:"Live" },
    "cnc-03": { path:"factory/workshopA/equipment/CNC/03", type:"Time-series", rate:"—", status:"Idle" },
    "wms":    { path:"factory/workshopB/wms/orders", type:"Relational", rate:"—", status:"Idle" },
  }[topicKey] || { path:"—", type:"—", rate:"—", status:"—" };

  const Row = ({k,v}) => (
    <div style={{display:"grid",gridTemplateColumns:"140px 1fr",padding:"14px 0",borderBottom:"1px solid #ECECEC"}}>
      <div style={{fontSize:13,color:"#585C62",letterSpacing:"-0.2px"}}>{k}</div>
      <div style={{fontSize:14,color:"#050B14",letterSpacing:"-0.2px",fontFamily: k==="Path" ? "var(--font-mono)" : "var(--font-sans)"}}>{v}</div>
    </div>
  );

  return (
    <div style={{flex:1,padding:"40px 48px",overflow:"auto",fontFamily:"var(--font-sans)",color:"#050B14",background:"#fff"}}>
      <h1 style={{margin:0,fontSize:28,fontWeight:500,letterSpacing:"-0.28px"}}>{meta.path.split("/").pop()}</h1>
      <div style={{fontSize:13,color:"#585C62",fontFamily:"var(--font-mono)",letterSpacing:"-0.2px",marginTop:6}}>{meta.path}</div>

      <div style={{marginTop:32,maxWidth:560}}>
        <Row k="Path" v={meta.path}/>
        <Row k="Type" v={meta.type}/>
        <Row k="Rate" v={meta.rate}/>
        <Row k="Status" v={meta.status}/>
      </div>
    </div>
  );
}

window.TopicDetail = TopicDetail;
