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

  export let ffmpeg;
  export let fetchedFile;

  onMount(async () => {
    // if (!ffmpeg) {
    //   ffmpeg = FFmpeg.createFFmpeg({
    //     // corePath: "/ffmpeg/ffmpeg-core.js"
    //     // log: true,
    //   });
    //   console.log("new ffmpeg singleton", ffmpeg);
    // }

    // if (!ffmpeg.isLoaded()) {
    //   await ffmpeg.load().catch(onLoadFail);
    //   console.log("ffmpeg is loaded");
    // }

    if (file && start && end && ffmpeg, fetchedFile) {
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

    // let fetchedFile;

    // fetchedFile = await FFmpeg.fetchFile(file).catch(onFetchFileFail);
    // console.log(
    //   "1. memory stats: fetchedFile",
    //   performance.memory.usedJSHeapSize,
    //   performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
    // );

    // fetchedFile = await FFmpeg.fetchFile(file).catch(onFetchFileFail);
    console.log(
      "2. memory stats: fetchedFile",
      performance.memory.usedJSHeapSize,
      performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
    );

    fetchedFile = await FFmpeg.fetchFile(file).catch(onFetchFileFail);
    console.log(
      "3. memory stats: fetchedFile",
      performance.memory.usedJSHeapSize,
      performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
    );

    // 1
    try {
      ffmpeg.FS("writeFile", name, fetchedFile);
      console.log(
        "1. memory stats: writeFile",
        performance.memory.usedJSHeapSize,
        performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
      );
    } catch (e) {
      console.warn("writeFile error", e);
    }
    // 2
    try {
      ffmpeg.FS("writeFile", name, fetchedFile);
      console.log(
        "2. memory stats: writeFile",
        performance.memory.usedJSHeapSize,
        performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
      );
    } catch (e) {
      console.warn("writeFile error", e);
    }
    // 3
    try {
      ffmpeg.FS("writeFile", name, fetchedFile);
      console.log(
        "3. memory stats: writeFile",
        performance.memory.usedJSHeapSize,
        performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
      );
    } catch (e) {
      console.warn("writeFile error", e);
    }

    // @try running this 3 times to see if the memory grooows
    // 1
    try {
      await ffmpeg.run("-ss", start, "-to", end, "-i", name, `output.mp3`);
      console.log(
        "1. memory stats ffmpeg.run",
        performance.memory.usedJSHeapSize,
        performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
      );
    } catch (e) {
      console.warn("run error", e);
    }
    // 2
    try {
      await ffmpeg.run("-ss", start, "-to", end, "-i", name, `output.mp3`);
      console.log(
        "2. memory stats ffmpeg.run",
        performance.memory.usedJSHeapSize,
        performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
      );
    } catch (e) {
      console.warn("run error", e);
    }
    // 3
    try {
      await ffmpeg.run("-ss", start, "-to", end, "-i", name, `output.mp3`);
      console.log(
        "3. memory stats ffmpeg.run",
        performance.memory.usedJSHeapSize,
        performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
      );
    } catch (e) {
      console.warn("run error", e);
    }

    let data;
    try {
      data = ffmpeg.FS("readFile", "output.mp3");
    } catch (e) {
      console.warn("readFile error", e);
    }

    if (data) {
      const blob = new Blob([data], { type: "audio/mp3" });

      src = URL.createObjectURL(blob);
    }

    return src;
  };
</script>
