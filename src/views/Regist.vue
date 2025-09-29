<template>
	<div>
		<!-- Header Component -->
		<Header title="게시판 등록">
			<template #left>
				<button class="btn btn-blue" @click="goBack">← 뒤로 가기</button>
			</template>
		</Header>

		<!-- Regist Component -->
		<RegistComponent />
	</div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import RegistComponent from '@/components/RegistComponent.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
	router.go(-1);
};
</script>
