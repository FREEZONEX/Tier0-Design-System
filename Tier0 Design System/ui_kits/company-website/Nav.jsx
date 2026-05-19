/* global React */

function Nav() {
  const link = {color:"#050B14",fontSize:14,letterSpacing:"-0.2px",textDecoration:"none",fontWeight:500};
  return (
    <header style={{display:"flex",alignItems:"center",padding:"18px 40px",borderBottom:"1px solid #ECECEC",background:"#fff",fontFamily:"var(--font-sans)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <img src="../../assets/tier0-logo-black.svg" alt="Tier0" style={{height:24,display:"block"}}/>
      </div>
      <nav style={{display:"flex",gap:28,marginLeft:40}}>
        <a style={link}>Platform</a><a style={link}>Docs</a><a style={link}>Pricing</a>
      </nav>
      <div style={{flex:1}}/>
      <div style={{display:"flex",gap:10,alignItems:"center"}}>
        <a style={{...link,color:"#585C62"}}>Sign in</a>
        <button style={{background:"#CCF368",color:"#333",border:0,padding:"10px 18px",borderRadius:4,fontFamily:"var(--font-sans)",fontWeight:500,fontSize:14,letterSpacing:"-0.2px",cursor:"pointer"}}>Start free trial</button>
      </div>
    </header>
  );
}

window.Nav = Nav;
