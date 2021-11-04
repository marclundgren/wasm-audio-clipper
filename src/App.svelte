<script lang="ts">
  import { onMount } from "svelte";
  import { SkeletonBlock } from "skeleton-elements/svelte";
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
  let transcoding = false;
  let transcodedSrc: string = "";
  let currentTime: number = 0;
  let duration: number;
  let ffmpeg: any; // @todo, i dont know what the signature is
  let fetchedFile: any; // @todo, i dont know what the signature is
  let fetchingFile: boolean = false;

  onMount(async () => {
    // @ts-ignore
    const FFmpeg = window.FFmpeg;

    if (typeof FFmpeg === "undefined") {
      console.error("FFmpeg is not defined");
      return;
    } else {
      console.log("typeof FFmpeg", typeof FFmpeg);
    }

    if (!ffmpeg) {
      ffmpeg = FFmpeg.createFFmpeg({
        // corePath: "/ffmpeg/ffmpeg-core.js"
        // log: true,
      });
    }

    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<main>
  <h1 class="title">{title}</h1>

  <Card animate={false}>
    <FileUploader
      disabled={transcoding || fetchingFile}
      onLoadFile={async (file) => {
        originalFile = file;
        originalUrlBlob = URL.createObjectURL(file);
        type = file.type;
        transcodedSrc = "";

        fetchingFile = true;
        // @ts-ignore
        fetchedFile = await window.FFmpeg.fetchFile(file);
        fetchingFile = false;
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
              bind:transcoding
              bind:transcodedSrc
              bind:ffmpeg
              bind:fetchedFile
            />
          </div>
        {/if}
      </div>
    </Card>
  {/if}

  {#if (transcoding && !transcodedSrc) || transcodedSrc}
    <Card>
      {#if transcoding && !transcodedSrc}
        <SkeletonBlock
          height={undefined}
          borderRadius={undefined}
          width="100%"
          effect="fade"
        />
        <SkeletonBlock
          height={undefined}
          borderRadius={undefined}
          width="100%"
          effect="fade"
        />
      {/if}

      {#if transcodedSrc}
        <div class="container">
          <MediaPlayer {type} src={transcodedSrc} />
          <Download src={transcodedSrc} />
        </div>
      {/if}
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
