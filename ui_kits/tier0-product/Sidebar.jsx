/* global React, Icon */
const { useState: useStateSB } = React;

function Sidebar({ active, onNav }) {
  const items = [
    { key: "namespace", label: "Namespace", icon: Icon.Namespace },
    { key: "broker", label: "Broker", icon: Icon.Broker },
    { key: "source", label: "Source Flow", icon: Icon.Flow },
    { key: "event", label: "Event Flow", icon: Icon.Flow },
    { key: "sink", label: "Sink", icon: Icon.Sink },
    { key: "topology", label: "Topology", icon: Icon.Topology },
  ];
  return (
    <aside style={{
      width: 220, background: "#050B14", color: "#fff",
      fontFamily: "var(--font-sans)", display: "flex", flexDirection: "column",
    }}>
      <div style={{padding:"22px 20px"}}>
        <img src="../../assets/tier0-logo-lime.svg" alt="Tier0" style={{height:22,display:"block"}}/>
      </div>
      <nav style={{padding:"4px 8px", flex:1}}>
        {items.map(it => {
          const sel = active === it.key;
          const I = it.icon;
          return (
            <div key={it.key} onClick={() => onNav(it.key)}
              style={{
                display:"flex", alignItems:"center", gap:10,
                padding:"10px 12px", margin:"2px 0",
                cursor:"pointer", borderRadius:4,
                color: sel ? "#B2ED1D" : "#CDCED0",
                background: sel ? "rgba(178,237,29,.08)" : "transparent",
                fontSize: 14, letterSpacing: "-0.2px",
              }}>
              <I size={16}/> <span>{it.label}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

window.Sidebar = Sidebar;
