<script>
  import { onMount } from "svelte";

  export let file;
  export let start;
  export let end;
  export let onTranscode;
  export let onLoadFail;
  export let onFetchFileFail;
  export let onTranscodeFail;
  export let src;

  onMount(() => {
    const ffmpeg = FFmpeg.createFFmpeg({
      log: true,
    });

    if (file && start && end && ffmpeg) {
      transcode(file, start, end, ffmpeg).then((src) => {
        onTranscode(src);
      });
    }
  });

  const transcode = async (file, start, end, ffmpeg) => {
    const name = file.name;
    await ffmpeg.load().catch(onLoadFail);
    const fetchedFile = await FFmpeg.fetchFile(file).catch(onFetchFileFail);
    ffmpeg.FS("writeFile", name, fetchedFile);
    await ffmpeg
      .run("-ss", start, "-to", end, "-i", name, `output.mp3`)
      .catch(onTranscodeFail);
    const data = ffmpeg.FS("readFile", "output.mp3");

    const blob = new Blob([data], { type: "audio/mp3" });
    src = URL.createObjectURL(blob);

    return src;
  };
</script>
