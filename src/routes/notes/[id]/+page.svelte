<script>
	import { applyAction, enhance } from '$app/forms';
	import { beforeNavigate, goto, invalidateAll } from '$app/navigation';
	// import { page } from '$app/stores';
	// import Note from '$lib/components/Note.svelte';
	import NoteActionDelete from '$lib/components/NoteActionDelete.svelte';
	import { getSecondsDiff, getTimeAgo, getUnitAndValueDate } from '$lib/timeAgo';
	import { onDestroy } from 'svelte';
	// import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	/** @type {HTMLFormElement} */
	let formElement;

	let updating = false;
	let title = data.note.title;
	let content = data.note.content;
	let deleting = false;

	function autosize(e) {
		let el = e.target;
		el.style.cssText = 'height:auto;';
		el.style.cssText = 'height:' + el.scrollHeight + 'px';
	}

	const handlerUpdate = () => {
		updating = true;
		return async ({ update, result }) => {
			await update({ reset: false });
			if (result.type === 'success') {
				updating = true;
				updateDate();
			}
		};
	};

	let timer = null;
	let timer2 = null;
	let key = 0;

	const updateDate = () => {
		const UNITS = {
			minute: 1000 * 60,
			second: 1000
		};
		const secondsElapsed = getSecondsDiff(data.note.modified.getTime());
		const { unit, value } = getUnitAndValueDate(secondsElapsed);
		const interval = UNITS[unit];
		const limit = 60 - value * -1;
		const next = Math.ceil(secondsElapsed / 60) * 60;
		const nextStep = Math.floor(next - secondsElapsed);

		if (unit === 'second') {
			const intervalSeconds = () => {
				const initInterval = () => {
					timer2 = setInterval(() => {
						if (key <= 60) return key++;

						key++;
						if (timer2) clearInterval(timer2);
					}, UNITS['minute']);
				};

				timer = setInterval(() => {
					if (key <= limit) return key++;
					key++;
					key = 0;
					if (timer) clearInterval(timer);

					return initInterval();
				}, interval);
			};
			intervalSeconds();
			return;
		}

		if (unit === 'minute') {
			const intervalMinutes = () => {
				const initInterval = () => {
					timer = setInterval(() => {
						if (key <= limit) return key++;
						key++;

						return clearTimer();
					}, interval);
				};
				const completeMinute = nextStep * UNITS['second'] + UNITS['second'];

				timer2 = setTimeout(() => {
					key += 1;
					initInterval();
				}, completeMinute);
			};
			intervalMinutes();
			return;
		}
	};

	beforeNavigate(async ({ cancel, to }) => {
		const change = title !== data.note.title || content !== data.note.content || !deleting;
		console.log({ deleting }, 'asda');

		if (change) {
			cancel();
			const data = new FormData(formElement);
			const response = await fetch('?/update', {
				method: 'POST',
				body: data
			});

			/** @type {import('@sveltejs/kit').ActionResult} */
			const result = await response.json();

			if (result.type === 'success') {
				if (to?.route?.id) await goto(to?.route.id);
			}
		}
	});

	// async function handleSubmit(event) {
	// 	const data = new FormData(this);

	// 	console.log(this.action);

	// 	const response = await fetch(this.action, {
	// 		method: 'POST',
	// 		body: data
	// 	});
	// 	/** @type {import('@sveltejs/kit').ActionResult} */
	// 	const result = await response.json();

	// 	if (result.type === 'success') {
	// 		// re-run all `load` functions, following the successful update
	// 		// await invalidateAll();
	// 		// applyAction(result);
	// 	}

	// 	console.log('chaoo');
	// }
</script>

<a href="/notes">back</a>

<!-- <br /> -->
<!-- <code>{data.note.id}</code> -->
<form bind:this={formElement} action="?/update" method="post" use:enhance={handlerUpdate}>
	<input type="hidden" name="id" value={data.note.id} />
	<input type="text" bind:value={title} name="title" />
	<textarea on:keydown={autosize} bind:value={content} name="content" />
	{#if title !== data.note.title || content !== data.note.content}
		<button type="submit">update</button>
	{/if}
</form>

{#if form?.success}<span>actualizada </span>{/if}
{#key key}
	<span>{getTimeAgo(data.note.modified.getTime())}</span>
{/key}

<div style="text-align: right;">
	<NoteActionDelete
		on:redirect={() => {
			deleting = true;
			console.log('xxxxxxx');
		}}
		id={data.note.id}
		redirect="/notes"
		action="/notes?/delete"
	/>
</div>

<style>
	form {
		padding-block: 1em;
	}

	input {
		border: none;
		font-size: 1.8em;
		font-weight: bold;
		background-color: transparent;
		outline: none;
		border: 1px solid transparent;
		width: 100%;
	}

	textarea {
		border: none;
		width: 100%;
		padding: 1em 0;
		background-color: transparent;
		outline: none;
		border: 1px solid transparent;
	}

	input:focus,
	textarea:focus {
		/* border: none; */
		border-bottom-color: green;
	}
</style>
