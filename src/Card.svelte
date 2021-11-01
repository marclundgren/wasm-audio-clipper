<script lang="ts">
  export let animate = true;
</script>

<div class="card {animate && 'animate'}">
  <slot name="title" class="title" />

  <slot>
    <p>No content was provided</p>
  </slot>
</div>

<style>
  .card {
    background: white;
    border-radius: 3px;
    box-shadow: 0 1px 2px #aaa;
    /* display: inline-block; */
    /* margin: 0 1rem 1rem; */
    /* max-width: 448px; */
    padding: 1.5rem;
    position: relative;
    z-index: 2;
    display: grid;
    place-content: stretch;
  }

  .card .title {
    font-size: 2rem;
    margin-bottom: 1em;
  }

  .card.animate {
    -webkit-animation: fly-in 0.3s 0.5s ease both;
    -moz-animation: fly-in 0.3s 0.5s ease both;
    -o-animation: fly-in 0.3s 0.5s ease both;
    animation: fly-in 0.3s 0.5s ease both;
  }

  @-webkit-keyframes fly-in {
    from {
      -webkit-transform: translateY(15rem) rotate(15deg);
      transform: translateY(15rem) rotate(15deg);
      opacity: 0;
    }
  }
  @-moz-keyframes fly-in {
    from {
      -moz-transform: translateY(15rem) rotate(15deg);
      transform: translateY(15rem) rotate(15deg);
      opacity: 0;
    }
  }
  @keyframes fly-in {
    from {
      transform: translateY(15rem) rotate(15deg);
      opacity: 0;
    }
  }
</style>
