<script lang="ts">
  export let src: string;
  export let type: string;
  export let duration: number = 0;
</script>

<audio controls bind:duration src={src} type={type} />

<style>
  audio {
    display: block;
    width: 100%;
  }
</style>