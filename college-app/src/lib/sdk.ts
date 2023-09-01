import { writable } from 'svelte/store';
import type { WoolfInstance } from '@woolfteam/client';

const sdk = writable<WoolfInstance>();

async function setSdk(instance: WoolfInstance) {
	sdk.set(instance);
}

export { sdk, setSdk };
