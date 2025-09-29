<template>
	<div>
		<!-- Header Component -->
		<Header :title="`[ ${noticeData.title} ] 상세`">
			<template #left>
				<button class="btn btn-blue" @click="goBack">← 뒤로 가기</button>
			</template>
			<template #right>
				<button class="btn btn-blue" @click="onClickUpdate">수정하기</button>
			</template>
		</Header>

		<!-- Detail Component -->
		<DetailComponent :noticeData="noticeData" />
	</div>
</template>

<script setup lang="ts">
import DetailComponent from '@/components/DetailComponent.vue';
import Header from '@/components/Header.vue';
import { onReadOne } from '@/utils/localStorageUtil';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

// State
const noticeData: any = reactive({});

// Methods
const onClickUpdate = () => {
	const id = route.query.id;
	router.push(`/update/${id}`);
};

const goBack = () => {
	router.go(-1);
};

// Lifecycle
onMounted(() => {
	const id = route.query.id;
	Object.assign(noticeData, onReadOne(id));
});
</script>
