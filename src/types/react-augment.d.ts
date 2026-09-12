// React 18's DOM prop allow-list doesn't know the `fetchpriority` image
// attribute. Passing it camelCased as `fetchPriority` makes React log a
// warning and drop it, so the browser never receives the priority hint on the
// hero image. Declaring the lowercase HTML spelling lets React pass it
// straight through to the DOM.
//
// The `import` is required: without it this file is treated as an ambient
// module declaration that REPLACES React's types instead of merging with them.
//
// The generic parameter is unused here but must match React's own declaration
// for the interface augmentation to merge.
import 'react';

declare module 'react' {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface ImgHTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}
