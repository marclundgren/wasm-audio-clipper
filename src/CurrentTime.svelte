<script lang="ts">
  import { onMount } from "svelte";
  import { Duration } from "luxon";
  import ClipboardJS from "clipboard";
  import CopyIcon from "./CopyIcon.svelte";

  export let currentTime: number = 0;

  let clipboard: ClipboardJS;

  onMount(() => {
    clipboard = new ClipboardJS(".copy-button");
  });

  $: formattedTime = Duration.fromObject({ seconds: currentTime }).toFormat(
    "hh:mm:ss.SSS"
  );

  $: {
    console.log(`the current formattedTime is ${formattedTime}`);
  }
</script>

<div class="container">
  <span class="formatted-time">{formattedTime}</span>

  <button
    type="button"
    class="icon-button copy-button"
    data-clipboard-target=".formatted-time"
  >
    <CopyIcon />
  </button>
</div>

<style>
  .formatted-time {
    width: 6rem;
  }
  .icon-button {
    background: none;
    border: none;
    padding: 1rem;
    margin: 0;
    cursor: pointer;
  }
  .container {
    display: inline-flex;
    align-items: center;
  }
</style>
