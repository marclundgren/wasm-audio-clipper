<script lang="ts">
  import { Duration } from "luxon";

  export let currentTime: number = 0;
  // const formattedTime =

  $: formattedTime = Duration.fromObject({ seconds: currentTime }).toFormat(
    "hh:mm:ss.SSS"
  );

  $: {
    console.log(`the current formattedTime is ${formattedTime}`);
  }

  // console.log('currentTime', currentTime);
</script>

<span>{formattedTime}</span>
