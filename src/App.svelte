<script lang="ts">
	import FileUploader from './FileUploader.svelte';
	import MediaPlayer from './MediaPlayer.svelte';
	import Controls from './Controls.svelte';
	import Download from './Download.svelte';
	import Card from './Card.svelte';
	
	export let title: string;
	
	let originalFile: File;
	let originalUrlBlob: string;
	let type: string;
	let transcodedSrc: string;
	
	function onTranscode(src) {
		transcodedSrc = src;
	}

	let duration: number;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<main>
	<h1>{title}</h1>
	<Card animate={false}>
		<FileUploader onLoadFile={(file) => {
			originalFile = file;
			originalUrlBlob = URL.createObjectURL(file);
			type = file.type
			console.log(file);
		}} />
	</Card>

	{#if originalUrlBlob}
		<Card>
			<div class="container">
				<MediaPlayer
					bind:duration={duration}
					type={type}
					src={originalUrlBlob}
				/>

				{#if duration}
					<Controls
						disabled={!originalUrlBlob}
						file={originalFile}
						duration={duration}
						bind:transcodedSrc={transcodedSrc}
					/>
				{/if}
			</div>
		</Card>
	{/if}
	
	{#if transcodedSrc}
		<Card>
			<div class="container">
				<MediaPlayer type={type} src={transcodedSrc} />
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>