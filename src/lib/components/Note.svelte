<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import NoteActionDelete from '$lib/components/NoteActionDelete.svelte';
	import { getSecondsDiff, getTimeAgo, getUnitAndValueDate } from '$lib/timeAgo';
	import { afterUpdate, onDestroy, onMount } from 'svelte';

	import { scale } from 'svelte/transition';

	export let note;
	export let selection;

	let timer = null;
	let timer2 = null;
	let key = 0;

	const clearTimer = () => {
		if (timer) clearInterval(timer);
		if (timer2) clearInterval(timer);
	};

	// onMount(() => {
	// 	const UNITS = {
	// 		minute: 1000 * 60,
	// 		second: 1000
	// 	};
	// 	const secondsElapsed = getSecondsDiff(note.modified.getTime());
	// 	const { unit, value } = getUnitAndValueDate(secondsElapsed);
	// 	const interval = UNITS[unit];
	// 	const limit = 60 - value * -1;
	// 	const next = Math.ceil(secondsElapsed / 60) * 60;
	// 	const nextStep = Math.floor(next - secondsElapsed);

	// 	if (unit === 'second') {
	// 		const intervalSeconds = () => {
	// 			const initInterval = () => {
	// 				timer2 = setInterval(() => {
	// 					if (key <= 60) return key++;

	// 					key++;
	// 					if (timer2) clearInterval(timer2);
	// 				}, UNITS['minute']);
	// 			};

	// 			timer = setInterval(() => {
	// 				if (key <= limit) return key++;
	// 				key++;
	// 				key = 0;
	// 				if (timer) clearInterval(timer);

	// 				return initInterval();
	// 			}, interval);
	// 		};
	// 		intervalSeconds();
	// 		return;
	// 	}

	// 	if (unit === 'minute') {
	// 		const intervalMinutes = () => {
	// 			const initInterval = () => {
	// 				timer = setInterval(() => {
	// 					if (key <= limit) return key++;
	// 					key++;

	// 					return clearTimer();
	// 				}, interval);
	// 			};
	// 			const completeMinute = nextStep * UNITS['second'] + UNITS['second'];

	// 			timer2 = setTimeout(() => {
	// 				key += 1;
	// 				initInterval();
	// 			}, completeMinute);
	// 		};
	// 		intervalMinutes();
	// 		return;
	// 	}
	// });

	onDestroy(() => {
		selection = selection.filter((r) => r !== note.id);
		clearTimer();
	});
</script>

<div class="note-container" class:selected={selection.includes(note.id)} transition:scale|local>
	<h4 class="title">{note.title}</h4>
	<p class="content">{note.content}</p>
	<div class="actions">
		{#key key}
			<span class="timeago">{getTimeAgo(note.modified.getTime())}</span>
		{/key}
		<a href="/notes/{note.id}">show</a>
		<NoteActionDelete id={note.id} />
	</div>
	<!-- <input type="checkbox" value={note.id} bind:group={selection} /> -->

	<slot />
</div>

<style>
	@media (prefers-color-scheme: dark) {
		:root {
			--selection: #1d4262;
			--selection-border: rgba(255, 255, 255, 0.2);
		}
	}
	@media (prefers-color-scheme: light) {
		:root {
			--selection: #b5deff;
			--selection-border: rgba(29, 66, 98, 0.5);
		}
	}

	.note-container {
		--shadow-opacity: 0.01;

		border: 1px solid transparent;
		background-color: var(--bg-ish);
		border-radius: 10px;
		padding: 1em;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-shadow: 0 1px 2px rgba(0, 0, 0, var(--shadow-opacity)),
			0 2px 4px rgba(0, 0, 0, var(--shadow-opacity)), 0 4px 8px rgba(0, 0, 0, var(--shadow-opacity)),
			0 8px 16px rgba(0, 0, 0, var(--shadow-opacity)),
			0 16px 32px rgba(0, 0, 0, var(--shadow-opacity)),
			0 32px 64px rgba(0, 0, 0, var(--shadow-opacity));

		transition: box-shadow 0.3s;
		will-change: box-shadow;
	}

	.content {
		flex: 1;
		word-break: break-word;
		padding-bottom: 2em;
	}

	.actions {
		font-size: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.timeago {
		opacity: 0.5;
	}

	.selected {
		background-color: var(--selection);
		border-color: var(--selection-border);
		box-shadow: 0 2px 1px rgba(0, 0, 0, 0.06), 0 4px 2px rgba(0, 0, 0, 0.06),
			0 8px 4px rgba(0, 0, 0, 0.06), 0 16px 8px rgba(0, 0, 0, 0.06), 0 32px 16px rgba(0, 0, 0, 0.06);
	}
</style>
