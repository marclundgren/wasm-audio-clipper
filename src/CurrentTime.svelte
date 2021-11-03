<script lang="ts">
  import { Duration } from "luxon";

  export let currentTime: number = 0;

  $: formattedTime = Duration.fromObject({ seconds: currentTime }).toFormat(
    "hh:mm:ss.SSS"
  );
</script>

<div class="container">
  <span class="formatted-time">{formattedTime}</span>
</div>

<style>
  .formatted-time {
    width: 6rem;
  }
  .container {
    display: inline-flex;
    align-items: center;
  }
</style>
