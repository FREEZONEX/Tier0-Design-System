declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content:
    | string
    | {
        readonly src: string;
        readonly height: number;
        readonly width: number;
        readonly blurDataURL?: string;
        readonly blurWidth?: number;
        readonly blurHeight?: number;
      };
  export default content;
}
