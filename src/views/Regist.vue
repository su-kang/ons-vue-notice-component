<template>
	<div>
		<!-- Header Component -->
		<Header title="게시판 등록">
			<template #left>
				<button class="btn btn-blue" @click="goBack">← 뒤로 가기</button>
			</template>
		</Header>

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
				<button class="btn btn-green" @click="onSubmit">등록</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import { ICON_LIST } from '@/utils/Constants';
import { onCreate } from '@/utils/localStorageUtil';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form state
const input = reactive({
	typeId: 1,
	title: '',
	createName: '',
	content: '',
	updateDate: '',
	id: 0,
});

// Methods
const onClickItem = (item: any) => {
	input.typeId = item.id;
};

const onSubmit = () => {
	// 등록 로직 (localStorage에 저장)
	onCreate(input);
	console.log('등록 데이터:', input);

	// 등록 후 리스트 페이지로 이동
	router.push('/');
};

const goBack = () => {
	router.go(-1);
};

// Lifecycle
onMounted(() => {
	// 컴포넌트 마운트 시 초기화
});
</script>
