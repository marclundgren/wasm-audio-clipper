<script lang="ts">
  import FileUploader from "./FileUploader.svelte";
  import MediaPlayer from "./MediaPlayer.svelte";
  import Controls from "./Controls.svelte";
  import Download from "./Download.svelte";
  import CurrentTime from "./CurrentTime.svelte";
  import Card from "./Card.svelte";

  export let title: string;

  let originalFile: File;
  let originalUrlBlob: string;
  let type: string;
  let transcodedSrc: string = "";
  let currentTime: number = 0;
  let duration: number;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<main>
  <h1 class="title">{title}</h1>

  <Card animate={false}>
    <FileUploader
      onLoadFile={(file) => {
        originalFile = file;
        originalUrlBlob = URL.createObjectURL(file);
        type = file.type;
        transcodedSrc = "";
      }}
    />
  </Card>

  {#if originalUrlBlob}
    <Card>
      <div class="container">
        <MediaPlayer
          bind:duration
          bind:currentTime
          {type}
          src={originalUrlBlob}
        />

        {#if duration}
          <div class="space-between">
            <CurrentTime currentTime={Number(currentTime.toFixed(2))} />

            <Controls
              disabled={!originalUrlBlob}
              file={originalFile}
              {duration}
              bind:transcodedSrc
            />
          </div>
        {/if}
      </div>
    </Card>
  {/if}

  {#if transcodedSrc}
    <Card>
      <div class="container">
        <MediaPlayer {type} src={transcodedSrc} />
        <Download src={transcodedSrc} />
      </div>
    </Card>
  {/if}
</main>

<style>
  :global(html, body) {
    height: 100%;
    background-color: #eee;
  }

  main {
    padding: 1em;
    margin: 0 auto;
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    display: grid;
    place-content: center;
    /* @todo revisit these rules */
  }

  .title {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    text-align: center;
  }

  .container {
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
