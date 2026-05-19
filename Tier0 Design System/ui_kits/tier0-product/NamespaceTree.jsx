/* global React, Icon */
const { useState: useStateNT } = React;

function NamespaceTree({ selected, onSelect }) {
  const [open, setOpen] = useStateNT({ factory: true, workshopA: true, workshopB: false });
  const toggle = (k) => setOpen(o => ({...o, [k]: !o[k]}));

  const Row = ({ depth, label, k, leaf, topic, selectedKey }) => {
    const sel = selectedKey === k;
    return (
      <div onClick={() => leaf ? onSelect(k) : toggle(k)}
        style={{
          display:"flex",alignItems:"center",gap:6,
          padding:"6px 10px",paddingLeft:10+depth*16,
          cursor:"pointer",borderRadius:4,
          background: sel ? "#F0FBD2" : "transparent",
          color: sel ? "#050B14" : "#050B14",
          fontFamily: leaf ? "var(--font-mono)" : "var(--font-sans)",
          fontSize: leaf ? 12 : 13, letterSpacing:"-0.2px",
        }}>
        {!leaf ? (open[k] ? <Icon.ChevronDown/> : <Icon.ChevronRight/>) : <span style={{width:14,display:"inline-block"}}/>}
        {!leaf ? <Icon.Namespace size={14}/> : <Icon.Dot color={topic==="live"?"#73B200":"#ACAEB1"}/>}
        <span>{label}</span>
        {leaf && topic==="live" && <span style={{marginLeft:"auto",fontSize:10,color:"#73B200"}}>LIVE</span>}
      </div>
    );
  };

  return (
    <div style={{width:260,background:"#fff",borderRight:"1px solid #ECECEC",overflow:"auto",fontFamily:"var(--font-sans)"}}>
      <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:8}}>
        <div style={{fontSize:12,color:"#585C62",letterSpacing:".3px",textTransform:"uppercase"}}>Topics</div>
        <div style={{flex:1}}/>
        <button title="Add path" style={{background:"transparent",border:0,width:22,height:22,display:"grid",placeItems:"center",cursor:"pointer",color:"#585C62"}}><Icon.Plus/></button>
      </div>
      <div style={{padding:"8px 6px"}}>
        <Row depth={0} label="factory" k="factory" selectedKey={selected}/>
        {open.factory && <>
          <Row depth={1} label="workshopA" k="workshopA" selectedKey={selected}/>
          {open.workshopA && <>
            <Row depth={2} label="equipment" k="equipment-a" selectedKey={selected}/>
            <Row depth={3} label="CNC/01" k="cnc-01" leaf topic="live" selectedKey={selected}/>
            <Row depth={3} label="CNC/02" k="cnc-02" leaf topic="live" selectedKey={selected}/>
            <Row depth={3} label="CNC/03" k="cnc-03" leaf topic="idle" selectedKey={selected}/>
            <Row depth={2} label="env" k="env" selectedKey={selected}/>
          </>}
          <Row depth={1} label="workshopB" k="workshopB" selectedKey={selected}/>
          {open.workshopB && <>
            <Row depth={2} label="wms/orders" k="wms" leaf topic="idle" selectedKey={selected}/>
          </>}
        </>}
      </div>
    </div>
  );
}

window.NamespaceTree = NamespaceTree;
