<script>
  import { onMount } from "svelte";

  export let file;
  export let start;
  export let end;
  export let onTranscode;
  export let onTranscodeFail;
  export let src;
  export let ffmpeg;
  export let fetchedFile;

  const outputFileName = "output.mp3"; // @todo make this a prop

  onMount(async () => {
    if ((file && start && end && ffmpeg, fetchedFile)) {
      transcode(file, start, end, ffmpeg, fetchedFile)
        .catch(onTranscodeFail)
        .then(onTranscode);
    }

    console.log(
      "memory stats",
      performance.memory.usedJSHeapSize,
      performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
    );
  });

  const transcode = async (file, start, end, ffmpeg, fetchedFile) => {
    const name = file.name;

    if (src) {
      try {
        URL.revokeObjectURL(src);
      } catch (e) {
        console.log("revokeObjectURL error", e);
      }
      try {
        await ffmpeg.FS("unlink", name);
      } catch (e) {
        console.warn("unlink error", e);
      }
    }

    try {
      ffmpeg.FS("writeFile", name, fetchedFile);
      console.log(
        "memory stats: writeFile",
        performance.memory.usedJSHeapSize,
        performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
      );
    } catch (e) {
      console.warn("writeFile error", e);
    }

    try {
      await ffmpeg.run("-ss", start, "-to", end, "-i", name, outputFileName);
      console.log(
        "memory stats ffmpeg.run",
        performance.memory.usedJSHeapSize,
        performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
      );
    } catch (e) {
      console.warn("run error", e);
    }

    let data;
    try {
      data = ffmpeg.FS("readFile", outputFileName);
    } catch (e) {
      console.warn("readFile error", e);
    }

    if (data) {
      let blob;

      try {
        blob = new Blob([data], { type: "audio/mp3" });
      } catch (e) {
        console.warn("new Blob error", e);
      }

      try {
        src = URL.createObjectURL(blob);
      } catch (e) {
        console.warn("createObjectURL error", e);
      }
    }

    return src;
  };
</script>
