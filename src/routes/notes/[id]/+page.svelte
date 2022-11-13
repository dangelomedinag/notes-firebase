<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1>{data.note.title}</h1>
<p>{data.note.content}</p>
<span>{data.note.modified.toLocaleDateString()}</span>
