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
		<UpdateComponent v-model="input" />
	</div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import UpdateComponent from '@/components/UpdateComponent.vue';
import { onDelete, onReadOne } from '@/utils/localStorageUtil';
import { onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

// State
const noticeData = reactive({});
const input = reactive({
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

// Watch for noticeData changes
watch(
	noticeData,
	newData => {
		if (newData && Object.keys(newData).length > 0) {
			Object.assign(input, newData);
		}
	},
	{ deep: true },
);

// Lifecycle
onMounted(() => {
	const id = route.params.id;
	Object.assign(noticeData, onReadOne(id));
});
</script>
