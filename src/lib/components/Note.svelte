<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import NoteActionDelete from '$lib/components/NoteActionDelete.svelte';
	import { getSecondsDiff, getTimeAgo, getUnitAndValueDate } from '$lib/timeAgo';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { quintInOut } from 'svelte/easing';

	import { scale } from 'svelte/transition';

	export let note;
	export let selection;

	let timer = null;
	let timer2 = null;
	let key = 0;
	let deleting = false;

	const clearTimer = () => {
		if (timer) clearInterval(timer);
		if (timer2) clearInterval(timer);
	};

	onMount(() => {
		// const UNITS = {
		// 	minute: 1000 * 60,
		// 	second: 1000
		// };
		const secondsElapsed = getSecondsDiff(note.modified.getTime());
		const { unit, value } = getUnitAndValueDate(secondsElapsed);
		const interval = 1000;
		const limit = 60 - value * -1;
		const next = Math.ceil(secondsElapsed / 60) * 60;
		const nextStep = Math.floor(next - secondsElapsed);

		if (unit === 'second') {
			const intervalSeconds = () => {
				// const initInterval = () => {
				// 	timer2 = setInterval(() => {
				// 		if (key <= 60) return key++;

				// 		key++;
				// 		if (timer2) clearInterval(timer2);
				// 	}, UNITS['minute']);
				// };

				timer = setInterval(() => {
					if (key <= limit) return key++;
					key++;
					// key = 0;
					if (timer) clearInterval(timer);

					// return initInterval();
				}, interval);
			};

			intervalSeconds();
			return;
		}

		// if (unit === 'minute') {
		// 	const intervalMinutes = () => {
		// 		const initInterval = () => {
		// 			timer = setInterval(() => {
		// 				if (key <= limit) return key++;
		// 				key++;

		// 				return clearTimer();
		// 			}, interval);
		// 		};
		// 		const completeMinute = nextStep * UNITS['second'] + UNITS['second'];

		// 		timer2 = setTimeout(() => {
		// 			key += 1;
		// 			initInterval();
		// 		}, completeMinute);
		// 	};
		// 	intervalMinutes();
		// 	return;
		// }
	});

	onDestroy(() => {
		selection = selection.filter((r) => r !== note.id);
		clearTimer();
	});
</script>

<div
	class="note-container"
	class:deleting
	class:selected={selection.includes(note.id)}
	in:scale|local={{ delay: 250, easing: quintInOut }}
	out:scale|local={{ delay: 0 }}
>
	<a href="/{note.id}">
		{#if note.title}
			<h4 class="title">{note.title}</h4>
		{/if}
		{#if note.content}
			<p class="content">{note.content}</p>
		{/if}
	</a>
	<div class="footer">
		{#key key}
			<span class="timeago">{getTimeAgo(note.modified.getTime())}</span>
		{/key}

		<div class="actions">
			<slot />
			<!-- <slot /> -->
			<!-- <a href="/notes/{note.id}">show</a> -->
			<NoteActionDelete
				on:afterUpdate={() => {
					deleting = true;
				}}
				id={note.id}
			/>
		</div>
	</div>
	<!-- <input type="checkbox" value={note.id} bind:group={selection} /> -->
</div>

<style>
	@media (prefers-color-scheme: dark) {
		:root {
			--selection: #1d4262;
			--selection-border: rgba(142, 142, 142, 0.05);
		}
	}
	@media (prefers-color-scheme: light) {
		:root {
			--selection: #b5deff;
			--selection-border: rgba(29, 66, 98, 0.5);
		}
	}

	.deleting::after {
		content: 'deleting';
		position: absolute;
		top: 0;
		left: 0;
		color: rgb(165, 0, 0);
		background-color: rgb(70, 0, 0);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.note-container {
		--shadow-opacity: 0.01;
		border: 1px solid var(--bg-invert);
		background-color: var(--bg);
		border-radius: 10px;
		position: relative;
		box-shadow: 0 1px 2px rgba(0, 0, 0, var(--shadow-opacity)),
			0 2px 4px rgba(0, 0, 0, var(--shadow-opacity)), 0 4px 8px rgba(0, 0, 0, var(--shadow-opacity)),
			0 8px 16px rgba(0, 0, 0, var(--shadow-opacity)),
			0 16px 32px rgba(0, 0, 0, var(--shadow-opacity)),
			0 32px 64px rgba(0, 0, 0, var(--shadow-opacity));

		transition: box-shadow 0.3s;
		will-change: box-shadow;
		overflow: hidden;
		/* height: 100%; */
	}

	.note-container:not(.selected):hover {
		background-color: var(--bg-ish);
	}

	a {
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1em;
		/* height: 100%; */
	}

	a:focus {
		outline-style: dotted;
		outline-offset: 2px;
		outline-width: 2px;
		outline-color: var(--selection-border);
		border-radius: 10px;
	}

	.title {
		margin-top: 0;
	}

	.content {
		flex: 1;
		word-break: break-word;
		margin: 0;
		/* padding-bottom: 2em; */
	}

	.footer {
		/* font-size: 1rem; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* padding-inline: 1em; */
		padding: 0.5em 1em;
		border: 1px solid transparent;
		border-top-color: var(--bg-ish);
		/* background-color: var(--selection-border); */
	}

	.timeago {
		opacity: 0.5;
		font-size: 0.8em;
	}

	.selected {
		background-color: var(--selection);
		border-color: var(--selection-border);
		box-shadow: 0 2px 1px rgba(0, 0, 0, 0.06), 0 4px 2px rgba(0, 0, 0, 0.06),
			0 8px 4px rgba(0, 0, 0, 0.06), 0 16px 8px rgba(0, 0, 0, 0.06), 0 32px 16px rgba(0, 0, 0, 0.06);
	}
	.selected .footer {
		background-color: var(--selection-border);
	}
	.selected:hover {
		background-color: var(--selection);
	}
</style>
