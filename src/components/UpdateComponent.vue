<template>
	<div class="regist">
		<div class="type">
			<h4>게시판 종류</h4>
			<!-- IconItem Component -->
			<IconItem :selectedTypeId="input.typeId" @clickItem="onClickItem" />
		</div>

		<div class="title_box">
			<h4>게시판 정보</h4>
			<div class="box">
				<label for="title">제 목</label>
				<input type="text" id="title" name="title" v-model="input.title" />
			</div>
			<div class="box">
				<label for="createName">작 성 자</label>
				<input
					type="text"
					id="createName"
					name="createName"
					v-model="input.createName"
				/>
			</div>
		</div>

		<div class="content_box">
			<h4>게시판 본문</h4>
			<textarea
				id="content"
				name="content"
				v-model="input.content"
				placeholder="본문을 입력해주세요"
			/>
		</div>

		<div class="button">
			<button class="btn btn-blue" @click="goBack">취소</button>
			<button class="btn btn-green" @click="onSubmit">수정</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconItem from '@/components/IconItem.vue';
import { onUpdate } from '@/utils/localStorageUtil';
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Props
interface Props {
	modelValue: {
		typeId: number;
		title: string;
		createName: string;
		content: string;
		updateDate: string;
		id: number;
	};
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
	'update:modelValue': [value: Props['modelValue']];
}>();

// State
const input = reactive({
	typeId: 1,
	title: '',
	createName: '',
	content: '',
	updateDate: '',
	id: 0,
});

// Watch for props.modelValue changes
watch(
	() => props.modelValue,
	newValue => {
		if (newValue && Object.keys(newValue).length > 0) {
			Object.assign(input, newValue);
		}
	},
	{ immediate: true, deep: true },
);

// Methods
const onClickItem = (item: any) => {
	input.typeId = item.id;
	emit('update:modelValue', { ...input });
};

const onSubmit = () => {
	// 수정 로직 (localStorage에 저장)
	onUpdate(input);
	console.log('수정 데이터:', input);

	// 수정 후 리스트 페이지로 이동
	router.push('/');
};

const goBack = () => {
	router.go(-1);
};
</script>
