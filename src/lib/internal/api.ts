export const searchApi = () => window.google!.search;
export const searchCSEApi = () => searchApi().cse;
export const searchElementApi = () => searchCSEApi().element;
