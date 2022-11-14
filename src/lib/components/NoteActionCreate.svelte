<script>
	import { enhance } from '$app/forms';
	import { scale, fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	import { loremIpsum } from '$lib/helpers';
	import { page } from '$app/stores';
	import Toast from '$lib/components/toast/Toast.svelte';
	import Spinner from './Spinner/Spinner.svelte';

	let title = '';
	let value = '';
	let message = 'saving...';
	let expanded = false;
	let section;
	let saving = false;

	const toggleMode = (node) => {
		function handlerClickOutside(e) {
			if (value.length > 0 || title.length > 0) return;

			if (section && !section.contains(e.target)) {
				expanded = false;
				document.removeEventListener('click', handlerClickOutside);
			}
		}

		function handlerFocus() {
			expanded = true;
			title = loremIpsum.title();
			value = loremIpsum.content();

			document.addEventListener('click', handlerClickOutside);
		}

		node.addEventListener('focus', handlerFocus);
	};

	const resetForm = async (e) => {
		const textarea = e.target;
		const element = textarea.querySelector('#content');
		element?.setAttribute('style', '');

		title = '';
		value = '';
		// expanded = false;
		saving = false;
	};

	const handlerSumit = ({ form }) => {
		expanded = false;
		saving = true;
		return async ({ update, result }) => {
			await update({ reset: false });
			if (result.type === 'success') {
				message = $page.form?.message;
				setTimeout(() => {
					form.reset();
				}, 800);
			}
		};
	};

	function autosize(e) {
		let el = e.target;
		el.style.cssText = 'height:auto;';
		el.style.cssText = 'height:' + el.scrollHeight + 'px';
	}
</script>

<section bind:this={section} class:expanded class="create-wrapper shadow">
	{#if saving}
		<div class="message" transition:fade={{ duration: 200 }}>
			{message}
			<Spinner />
		</div>
	{/if}
	<form
		action="?/create"
		method="post"
		class="create"
		use:enhance={handlerSumit}
		on:reset={resetForm}
	>
		{#if expanded}
			<label for="title">
				<input
					type="text"
					name="title"
					id="title"
					placeholder="Título"
					class="create-title"
					bind:value={title}
					autocomplete="off"
				/>
			</label>
		{/if}
		<label for="content">
			<textarea
				placeholder="+ añade una nota"
				name="content"
				id="content"
				use:toggleMode
				on:keydown={autosize}
				bind:value
				rows="1"
			/>
		</label>

		{#if expanded}
			<div class="actions-wrapper">
				<button
					type="submit"
					class="actions-button primary"
					disabled={value.length < 1 && title.length < 1}>crear</button
				>
				<button type="reset" class="actions-button">cancel</button>
			</div>
		{/if}
	</form>
</section>

<style>
	.message {
		font-weight: bold;
		color: #56cf8a;
		inset: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgb(25, 92, 57);
		z-index: 1;
	}

	.create-wrapper {
		margin-block: 1em;
		border: 1px solid var(--bg-ish);
		border-radius: 8px;
		position: relative;
		overflow: hidden;
		max-width: 800px;
		width: 100%;
		margin-inline: auto;
	}

	.expanded,
	.create-wrapper:hover,
	.create-wrapper:focus-within {
		/* border: 1px solid rgba(204, 204, 204, 1); */
		background-color: var(--bg-ish);
	}

	form {
		text-align: center;
	}

	textarea {
		width: 100%;
		max-width: 100%;
		padding: 0.8em;
		/* padding-bottom: 2em; */
		font-family: inherit;
		font-size: 1em;
		border-radius: 6px;
		outline: none;
		border: 1px solid transparent;
		background-color: transparent;
		margin: 0;
		display: block;
		border-radius: 0;
		overflow: hidden;
	}

	.actions-wrapper {
		/* padding: 0 0.8em; */
		/* width: 100%; */
		display: flex;
		justify-content: start;
		align-items: center;
		border: 1px solid transparent;
		border-top-color: rgba(204, 204, 204, 0.1);
	}
	.actions-button {
		/* padding: 0 0.8em; */
		/* width: 100%; */
		font-family: inherit;
		font-size: 0.9rem;
		margin: 0.5em;
		padding: 0.8em 4em;
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: 8px;
		/* font-weight: bold; */
	}

	.primary:not(:disabled) {
		border: 1px solid rgba(25, 92, 57, 0.3);
	}

	.actions-button:disabled {
		background-color: rgba(25, 92, 57, 0.05);
		cursor: not-allowed;
	}
	.actions-button:disabled:hover {
		background-color: rgba(25, 92, 57, 0.1);
	}

	.actions-button:not(:disabled):hover,
	.actions-button:not(:disabled):focus {
		border: 1px solid white;
		background-color: rgb(25, 92, 57);
		color: white;
	}

	.create-title {
		display: block;
		font-size: 1.2em;
		font-weight: bold;
		/* color: #646464; */
		background-color: transparent;
		border-radius: 0;
		width: 100%;
		padding: 0.8em;
		/* border-radius: 6px; */
		outline: none;
		border: 1px solid transparent;
		/* position: relative; */
	}
	.create-title,
	textarea {
		opacity: 0.5;
	}

	.create-title:focus,
	textarea:focus {
		opacity: 1;
	}

	.create-title::placeholder,
	textarea::placeholder {
		color: rgb(169, 169, 169);
	}

	label {
		display: block;
		position: relative;
		width: 100%;
	}

	label:focus-within:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 2px;
		height: 100%;
		background-color: rgb(25, 92, 57);
	}

	.shadow {
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
	}
</style>
