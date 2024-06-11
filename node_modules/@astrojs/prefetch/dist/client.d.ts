export interface PrefetchOptions {
    /**
     * Element selector used to find all links on the page that should be prefetched.
     *
     * @default 'a[href][rel~="prefetch"]'
     */
    selector?: string;
    /**
     * The number of pages that can be prefetched concurrently.
     *
     * @default 1
     */
    throttle?: number;
    /**
     * Element selector used to find all links on the page that should be prefetched on user interaction.
     *
     * @default 'a[href][rel~="prefetch-intent"]'
     */
    intentSelector?: string | string[];
}
export default function prefetch({ selector, throttle, intentSelector, }: PrefetchOptions): Promise<never> | undefined;
