/* global React, Icon */

function Topbar({ title }) {
  return (
    <header style={{
      height: 56, borderBottom: "1px solid #ECECEC",
      display: "flex", alignItems: "center",
      padding: "0 24px", gap: 16, background: "#fff",
      fontFamily: "var(--font-sans)", color: "#050B14",
    }}>
      <div style={{fontSize:18,fontWeight:500,letterSpacing:"-0.24px"}}>{title}</div>
      <div style={{flex:1}}/>
      <button style={{background:"#CCF368",color:"#333",border:0,padding:"8px 14px",borderRadius:4,fontFamily:"var(--font-sans)",fontWeight:500,fontSize:13,letterSpacing:"-0.2px",cursor:"pointer"}}>
        + New Topic
      </button>
    </header>
  );
}

window.Topbar = Topbar;
