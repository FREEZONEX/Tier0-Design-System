import { createRoot } from 'react-dom/client';
import '../../02-components/packages/theme/src/index.scss';
import './main.css';
import { TooltipProvider } from '@tier0/ui/components/ui/tooltip';
import App from './App';

// 主题：门户通过 postMessage 或 URL 里的 ?dark 传入
const setDark = (d: boolean) => document.documentElement.classList.toggle('dark', d);
setDark(new URLSearchParams(location.search).has('dark') || location.hash.includes(':dark'));
addEventListener('message', e => { if (e.data && e.data.type === 't0-theme') setDark(!!e.data.dark); });

createRoot(document.getElementById('root')!).render(<TooltipProvider delayDuration={150}><App /></TooltipProvider>);

// 把内容高度告诉门户，让 iframe 跟着变高
const report = () => parent.postMessage({ type: 't0-preview', id: location.hash.slice(1).split(':')[0], h: Math.ceil(document.documentElement.scrollHeight) }, '*');
new ResizeObserver(report).observe(document.body);
addEventListener('load', report);
