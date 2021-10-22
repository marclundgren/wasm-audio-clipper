<script>
  import {onMount} from 'svelte';

  export let file;
  export let start;
  export let end;
  // export let onTranscode;
  export let onLoadFail;
  export let onFetchFileFail;
  export let onTranscodeFail;
  export let src;

  console.log('file', file);
  console.log('start', start);
  console.log('end', end);
  console.log('typeof FFmpeg', typeof FFmpeg);
	
	onMount(() => {
    const ffmpeg = FFmpeg.createFFmpeg({
      log: true,
      // corePath: "./@ffmpeg/core/dist/ffmpeg-core.js",
      // corePath: "../node_modules/@ffmpeg/core/dist/ffmpeg-core.js",
      // corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    });

    if (file && start && end && ffmpeg) {
      console.log('transcoding...')
      transcode(file, start, end, ffmpeg);
    } else {
      console.log('missing something')
    }
  });

  const transcode = async (file, start, end, ffmpeg) => {
    const name = file.name;
    await ffmpeg.load().catch(onLoadFail);
    const fetchedFile = await FFmpeg.fetchFile(file).catch(onFetchFileFail)
    ffmpeg.FS("writeFile", name, fetchedFile);
    await ffmpeg.run(
      "-ss",
      start,
      "-to",
      end,
      "-i",
      name,
      `output.mp3`
    ).catch(onTranscodeFail);
    const data = ffmpeg.FS("readFile", "output.mp3");

    const blob = new Blob([data], { type: "audio/mp3" });
    src = URL.createObjectURL(blob);

    // onTranscode(src);
  };
</script>