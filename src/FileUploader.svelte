<script lang="ts">
  export let onLoadFile: (file: File) => void;
  export let disabled = false;

  let notCompatible =
    !window.crossOriginIsolated ||
    !window.FileReader ||
    !window.File ||
    // @ts-ignore
    typeof FFmpeg === "undefined";

  if (disabled) {
    console.log("window.crossOriginIsolated", window.crossOriginIsolated);
    console.log("window.FileReader", window.FileReader);
    console.log("window.File", window.File);
    // @ts-ignore
    console.log("window.FFmpeg", typeof FFmpeg + "");
  }

  const onFileSelected = (event) => {
    const file = event.target.files[0];

    if (file) {
      onLoadFile(file);
      console.log("file", file);
    }
  };

  const accept = [
    "audio/3gpp",
    "audio/aac",
    "audio/flac",
    "audio/mp3",
    "audio/mp4",
    "audio/mpeg",
    "audio/ogg",
    "audio/wav",
    "audio/webm",
    "audio/x-m4a",
  ].join(",");
</script>

<form>
  <button
    type="button"
    class="fileUpload btn btn-primary"
    disabled={disabled || notCompatible}
  >
    <label for="uploadBtn">Select an audio file to trim</label>
    <input
      id="uploadBtn"
      type="file"
      class="upload"
      {disabled}
      {accept}
      on:change={onFileSelected}
    />
  </button>
</form>

{#if notCompatible}
  <p class="centered">This browser is not supported&hellip;</p>
{/if}

<style lang="scss">
  form {
    display: grid;
  }
  .fileUpload {
    position: relative;
    overflow: hidden;
    margin: 10px;
  }
  .fileUpload input.upload {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    // filter: alpha(opacity=0);
  }
  .centered {
    display: grid;
    place-content: center;
  }
</style>
