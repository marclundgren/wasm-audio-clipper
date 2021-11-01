<script lang="ts">
  import moment from "moment";
  import Transcoder from "./Transcoder.svelte";

  // const PATTERN = "\d{2}:\d{2}:\d{2}(\.?\d{1,3})?";
  // const pattern = /\d{2}:\d{2}:\d{2}(\.?\d{1,3})?/;
  const timeFormat = `\\d{2}:\\d{2}:\\d{2}(\\.?\\d{1,3})?`;
  // hours:minutes:seconds.milliseconds

  let start: string;
  let end: string;

  // export let timeFormat: string;
  export let file: File;
  export let disabled = false;
  export let duration: number;
  export let onTranscode: (src: string) => void = () => {}; // todo remove
  export let transcodedSrc: string;

  console.log("file", file);
  console.log("duration", duration);

  let endPlaceholder;
  if (duration) {
    const d = moment.duration(duration, "seconds");
    let hours = `0${d.get("hours")}`;
    if (hours.length > 2) {
      hours = hours.slice(-2);
    }
    let minutes = `0${d.get("minutes")}`;
    if (minutes.length > 2) {
      minutes = minutes.slice(-2);
    }
    let seconds = `0${d.get("seconds")}`;
    if (seconds.length > 2) {
      seconds = seconds.slice(-2);
    }
    let milliseconds = `00${d.get("milliseconds")}`;
    if (milliseconds.length > 3) {
      milliseconds = milliseconds.slice(-3);
    }
    endPlaceholder = `${hours}:${minutes}:${seconds}`;
    if (milliseconds) {
      endPlaceholder += `.${milliseconds}`;
    }
  }

  let transcoding = false;

  function _onTranscode(src) {
    console.log("transcoded src", src);
    transcoding = false;
    onTranscode(src);

    transcoding = false;
  }
  function _onLoadFail(err) {
    console.error("load fail", err);
    transcoding = false;
  }
  function _onFetchFileFail(err) {
    console.error("fetch file fail", err);
    transcoding = false;
  }
  function _onTranscodeFail(err) {
    console.error("transcode fail", err);
    transcoding = false;
  }
</script>

<form
  on:submit={(event) => {
    event.preventDefault();
    transcoding = true;
    transcodedSrc = null;
  }}
>
  <label>
    Start Time:
    <input
      required
      {disabled}
      pattern={timeFormat}
      minlength="8"
      maxlength="12"
      placeholder="00:00:00.000"
      type="text"
      bind:value={start}
    />
  </label>
  <label>
    End Time:
    <input
      required
      {disabled}
      pattern={timeFormat}
      minlength="8"
      maxlength="12"
      placeholder={endPlaceholder}
      type="text"
      bind:value={end}
    />
  </label>

  <button disabled={disabled || transcoding} type="submit">Get Clip!</button>
</form>

{#if transcoding}
  <Transcoder
    onLoadFail={_onLoadFail}
    onFetchFileFail={_onFetchFileFail}
    onTranscodeFail={_onTranscodeFail}
    onTranscode={_onTranscode}
    {file}
    {start}
    {end}
    bind:src={transcodedSrc}
  />
{/if}

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  input {
    width: 7.25rem;
  }
</style>
