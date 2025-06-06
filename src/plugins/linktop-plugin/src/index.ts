
import { registerPlugin } from '@capacitor/core';
import type { LinktopPlugin } from './definitions';

const Linktop = registerPlugin<LinktopPlugin>('Linktop', {
  web: () => import('./web').then(m => new m.LinktopWeb()),
});

export * from './definitions';
export { Linktop };
