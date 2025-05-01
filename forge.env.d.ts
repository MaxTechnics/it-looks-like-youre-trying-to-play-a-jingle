/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />

declare module '*.wav' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}
