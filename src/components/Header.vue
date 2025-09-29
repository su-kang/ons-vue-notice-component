<template>
	<header class="Header">
		<!-- Slot left -->
		<div class="header_left">
			<slot name="left"></slot>
		</div>
		<div class="header_center">{{ title }}</div>
		<!-- Slot right -->
		<div class="header_right">
			<slot name="right"></slot>
		</div>
	</header>
</template>

<script setup lang="ts">
interface Props {
	title: string;
}

defineProps<Props>();
</script>
