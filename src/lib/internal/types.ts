import type { Gname } from '$lib/types/base';
import type { ComponentConfig, OptComponentConfig } from '$lib/types/google';

export type Context = Record<Gname, ComponentConfig | OptComponentConfig>;
