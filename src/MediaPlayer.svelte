<script lang="ts">
  import { onMount } from "svelte";
  export let src: string;
  export let type: string;
  export let duration: number = 0;
  export let currentTime: number = 0;

  let audioEl: HTMLAudioElement;
  let initialVolume = 0.5;

  onMount(() => {
    if (audioEl) {
      audioEl.volume = initialVolume;

      // @ts-ignore
      audioEl.controlsList = "nodownload";
    }
  });
</script>

<audio
  controls
  bind:this={audioEl}
  bind:currentTime
  bind:duration
  {src}
  {type}
/>

<style>
  audio {
    display: block;
    width: 100%;
  }
</style>
