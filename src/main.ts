// @ts-ignore
import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    title: "WASM AUDIO CLIPPER",
  },
});

export default app;
