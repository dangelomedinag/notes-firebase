<script>
	import '../app.css';

	// export let data;
</script>

<div class="container">
	<header><a href="/">home</a></header>
	<main>
		<slot />
	</main>
	<footer>footer</footer>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
		/* max-width: 1000px; */
		margin: 0 auto;
	}

	header,
	footer {
		text-align: center;
		padding: 1em;
	}

	main {
		flex: 1;
		padding-inline: 1em;
		max-width: 1000px;
		width: 100%;
		/* background-color: red; */
		margin: 0 auto;
		/* margin-inline: auto; */
	}

	header {
		background-color: var(--bg-ish);
	}
</style>
