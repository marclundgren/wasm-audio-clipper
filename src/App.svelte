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
  let transcodedSrc: string;
  let currentTime: number = 0;
  let duration: number;

  console.log("currentTime.toFixed(2)", currentTime.toFixed(2));
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<main>
  <h1>{title}</h1>
  <Card animate={false}>
    <FileUploader
      onLoadFile={(file) => {
        originalFile = file;
        originalUrlBlob = URL.createObjectURL(file);
        type = file.type;
        console.log(file);
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
            <!-- <span>{currentTime.toFixed(2)}</span> -->
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
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .container {
    display: grid;
    gap: 1rem;
  }

  .space-between {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
