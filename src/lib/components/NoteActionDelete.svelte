<script>
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import Spinner from './Spinner/Spinner.svelte';

	/**@type {string} */
	export let id;

	/**@type {string} */
	export let action = '?/delete';

	/**@type {string|undefined} */
	export let redirect = undefined;

	let sending = false;
	const dispatch = createEventDispatcher();

	const handlerDelete = ({ cancel }) => {
		const ok = confirm('realmente desea eliminar esta nota?');

		if (!ok) {
			cancel();
			return;
		}
		sending = true;

		return async ({ update, result }) => {
			dispatch('afterUpdate');
			if (result.type === 'success') {
			}
			if (result.type === 'redirect') {
				await update();
			}
			sending = false;
		};
	};
	/** @param {Event} e*/
	const handlerClick = (e) => {
		e.stopPropagation();
	};
</script>

<form {action} method="post" use:enhance={handlerDelete}>
	{#if redirect}
		<input type="hidden" value={redirect} name="redirectTo" />
	{/if}
	<input type="hidden" value={id} name="id" />
	<button type="submit" on:click={handlerClick}>
		{#if !sending}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
				/>
			</svg>
		{:else}
			deleting...
			<Spinner />
		{/if}
	</button>
</form>

<style>
	form {
		display: contents;
		padding: 0;
		margin: 0;
		color: #ff6a6a;
	}

	button {
		font-size: inherit;
		padding: 0.2em;
		border-radius: 50vh;
		border: 1px solid transparent;
		margin: 0;
		line-height: 1rem;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		color: inherit;
		background-color: transparent;
	}

	button:hover {
		color: #ff6a6a;
		border: 1px solid #ff6a6a;
	}
	button:active {
		background-color: rgba(255, 0, 0, 0.3);
	}

	svg {
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}
</style>
