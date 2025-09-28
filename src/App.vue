<template>
	<main>
		<router-view />
	</main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// 환경 변수에서 title 가져와서 설정
onMounted(() => {
	document.title = import.meta.env.VITE_APP_TITLE;
});
</script>

<style src="./assets/layout.css"></style>
<style src="./assets/style.css"></style>
