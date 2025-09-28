<template>
	<div>
		<!-- Header Component -->
		<header class="Header">
			<!-- Button Component -->
			<div class="header_left">
				<button class="btn btn-blue" @click="goBack">← 뒤로 가기</button>
			</div>
			<div class="header_center">게시판 수정</div>
			<div class="header_right">
				<button class="btn btn-red" @click="onClickDelete">삭 제</button>
			</div>
		</header>

		<!-- NoticeRegist Component -->
		<div class="regist">
			<div class="type">
				<h4>게시판 종류</h4>
				<section class="list_wrapper_item">
					<div
						v-for="item in ICON_LIST"
						:key="item.id"
						class="typeItem"
						:class="{ selected: item.id === input.typeId }"
						@click="onClickItem(item)"
					>
						<img :src="item.icon" />
						<span>{{ item.name }}</span>
					</div>
				</section>
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
	</div>
</template>

<script setup lang="ts">
import { ICON_LIST } from '@/utils/Constants';
import { onDelete, onReadOne, onUpdate } from '@/utils/localStorageUtil';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

// State
const noticeData = ref({});
const input = ref({
	typeId: 1,
	title: '',
	createName: '',
	content: '',
	updateDate: '',
	id: 0,
});

// Methods
const onClickItem = (item: any) => {
	input.value = {
		...input.value,
		typeId: item.id,
	};
};

const onSubmit = () => {
	// 수정 로직 (localStorage에 저장)
	onUpdate(input.value);
	console.log('수정 데이터:', input.value);

	// 수정 후 리스트 페이지로 이동
	router.push('/');
};

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
			input.value = {
				...input.value,
				...newData,
			};
		}
	},
	{ deep: true },
);

// Lifecycle
onMounted(() => {
	const id = route.params.id;
	noticeData.value = onReadOne(id);
});
</script>
