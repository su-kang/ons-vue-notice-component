<template>
	<div>
		<!-- Header Component -->
		<Header title="게시판 샘플 리스트">
			<template #left></template>
			<template #right>
				<button class="btn btn-green" @click="navigateToRegist">
					새글 등록
				</button>
			</template>
		</Header>

		<!-- List Component -->
		<ListComponent />
	</div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import ListComponent from '@/components/ListComponent.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToRegist = () => {
	router.push('/regist');
};
</script>
