<template>
	<div>
		<!-- Header Component -->
		<Header title="게시판 수정">
			<template #left>
				<button class="btn btn-blue" @click="goBack">← 뒤로 가기</button>
			</template>
			<template #right>
				<button class="btn btn-red" @click="onClickDelete">삭 제</button>
			</template>
		</Header>

		<!-- Update Component -->
		<UpdateComponent v-model="noticeData" />
	</div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import UpdateComponent from '@/components/UpdateComponent.vue';
import { onDelete, onReadOne } from '@/utils/localStorageUtil';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

// State
const noticeData = reactive({
	typeId: 1,
	title: '',
	createName: '',
	content: '',
	updateDate: '',
	id: 0,
});

// Methods

const onClickDelete = () => {
	if (confirm('게시글을 삭제하시겠습니까?')) {
		const id = route.params.id;
		onDelete(id);
		router.push('/');
	}
};

const goBack = () => {
	router.go(-1);
};

// Lifecycle
onMounted(() => {
	const id = route.params.id;
	const data = onReadOne(id);
	if (data) {
		Object.assign(noticeData, data);
	}
});
</script>
