<script lang='ts'>
  export let src: string;

  function onClick() {
    const a = document.createElement("a");
    a.href = src;
    a.download = src;
    a.click();
  }
</script>

<button class="download" disabled={!src} on:click={onClick}>Download</button>

<style>
  .download {
    display: block;
  }
</style>