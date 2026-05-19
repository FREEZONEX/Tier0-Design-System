/* global React */
const { useState } = React;

const Icon = {
  Namespace: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width={p.size||18} height={p.size||18}><rect x="3" y="6" width="18" height="13" rx="1"/><path d="M3 10h18M8 6V4m8 2V4"/></svg>,
  Broker: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width={p.size||18} height={p.size||18}><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4v16"/></svg>,
  Sink: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width={p.size||18} height={p.size||18}><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>,
  Flow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width={p.size||18} height={p.size||18}><path d="M4 6h8M4 12h16M4 18h10"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/></svg>,
  Topology: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width={p.size||18} height={p.size||18}><circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 11l10-4M7 13l10 4"/></svg>,
  Settings: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width={p.size||18} height={p.size||18}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>,
  Search: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width={p.size||16} height={p.size||16}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>,
  ChevronDown: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width={p.size||14} height={p.size||14}><path d="M6 9l6 6 6-6"/></svg>,
  ChevronRight: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width={p.size||14} height={p.size||14}><path d="M9 6l6 6-6 6"/></svg>,
  Plus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={p.size||14} height={p.size||14}><path d="M12 5v14M5 12h14"/></svg>,
  Import: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width={p.size||14} height={p.size||14}><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>,
  Dot: ({color="#73B200"}) => <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:color}}/>,
};

window.Icon = Icon;
