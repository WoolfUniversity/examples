<script lang='ts'>
	import { page } from '$app/stores';

	export const links = [{ title: 'For student', link: '/student' }, { title: 'For teacher', link: '/teacher' }];
</script>

<header class='navbar p-2'>
	<section class='navbar-section'>
		{#each links as { title, link }}
			<a class='btn btn-link' class:active={$page.url.pathname.includes(link)} href={link}>
				{title}
			</a>
		{/each}
	</section>
</header>

<main>
	<slot />
</main>

<style>
	main {
		padding: 100px;
	}
</style>
