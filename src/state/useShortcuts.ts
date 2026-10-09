import { useEffect } from 'react';
import { stepZoom } from '../components/Stage';
import { applyCrop, toggleMask, toggleSplit, toggleTool } from '../lib/actions';
import { exportPNG } from '../lib/exporter';
import { pickFiles } from '../lib/files';
import { useStudio, type ViewMode } from './store';

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el) return false;
  if (el.isContentEditable || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') return true;
  return el.tagName === 'INPUT' && !['range', 'checkbox', 'button'].includes((el as HTMLInputElement).type);
}

export function useShortcuts() {
  useEffect(() => {
    let peek: ViewMode | null = null;

    const onKeyDown = (e: KeyboardEvent) => {
      const s = useStudio.getState();
      const mod = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();

      if (mod && key === 'k') {
        e.preventDefault();
        s.set({ paletteOpen: !s.paletteOpen });
        return;
      }
      if (s.paletteOpen) return;

      if (e.key === 'Escape') {
        if (s.shortcutsOpen) s.set({ shortcutsOpen: false });
        else if (s.tool !== 'none') s.setTool('none');
        return;
      }

      if (mod) {
        if (isTyping(e.target) && (key === 'z' || key === 'y')) return;
        if (key === 'z' && !e.shiftKey) {
          e.preventDefault();
          s.undo();
        } else if ((key === 'z' && e.shiftKey) || key === 'y') {
          e.preventDefault();
          s.redo();
        } else if (key === 'o') {
          e.preventDefault();
          pickFiles();
        } else if (key === 's') {
          e.preventDefault();
          if (s.image) exportPNG();
        }
        return;
      }

      if (e.altKey || isTyping(e.target)) return;
      if (e.key === '?') {
        s.set({ shortcutsOpen: true });
        return;
      }
      if (!s.image) return;

      if (key === 'b' && !e.repeat && !peek) {
        peek = s.viewMode;
        s.setView({ viewMode: 'original' });
      } else if (key === 's' && !e.repeat) toggleSplit();
      else if (key === 'f') s.requestFit();
      else if (key === '1') s.setView({ zoom: 100 });
      else if (e.key === '+' || e.key === '=') stepZoom(1);
      else if (e.key === '-' || e.key === '_') stepZoom(-1);
      else if (key === 'c' && !e.repeat) toggleTool('crop');
      else if (key === 'e' && !e.repeat) toggleTool('eraser');
      else if (key === 'm' && !e.repeat) toggleMask();
      else if (e.key === 'Enter' && s.tool === 'crop') applyCrop();
    };

    const restore = () => {
      if (peek) {
        useStudio.getState().setView({ viewMode: peek });
        peek = null;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b') restore();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', restore);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', restore);
    };
  }, []);
}
