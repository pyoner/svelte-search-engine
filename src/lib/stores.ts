import { writable } from 'svelte/store';

const imageSearchStarting = writable(false);
const imageResultsReady = writable(false);
const imageResultsRendered = writable(false);
const webSearchStarting = writable(false);
const webResultsReady = writable(false);
const webResultsRendered = writable(false);

export {
	imageSearchStarting,
	imageResultsReady,
	imageResultsRendered,
	webSearchStarting,
	webResultsReady,
	webResultsRendered
};
