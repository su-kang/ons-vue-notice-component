<template>
	<div>
		<!-- Header Component -->
		<header class="Header">
			<!-- Button Component -->
			<div class="header_left">
				<button class="btn btn-blue" @click="goBack">← 뒤로 가기</button>
			</div>
			<div class="header_center">[ {{ noticeData.title }} ] 상세</div>
			<!-- Button Component -->
			<div class="header_right">
				<button class="btn btn-blue" @click="onClickUpdate">수정하기</button>
			</div>
		</header>

		<!-- NoticeDetail Component -->
		<div class="detail">
			<div class="detail_box">
				<h4>게시판 종류</h4>
				<div class="detail_type">
					<img
						class="item_img"
						:src="selectIconInfo(noticeData.typeId)?.icon"
					/>
					<div class="item_name">
						{{ selectIconInfo(noticeData.typeId)?.name }}
					</div>
				</div>
			</div>

			<div class="detail_box">
				<h4>게시판 정보</h4>
				<div class="detail_info">
					<div class="box">
						<div class="box_key">제 목</div>
						<div class="box_value">{{ noticeData.title }}</div>
					</div>
					<div class="box">
						<div class="box_key">작 성 자</div>
						<div class="box_value">{{ noticeData.createName }}</div>
					</div>
					<div class="box">
						<div class="box_key">수 정 일</div>
						<div class="box_value">{{ noticeData.updateDate }}</div>
					</div>
				</div>
			</div>

			<div class="detail_box">
				<h4>게시판 본문</h4>
				<textarea
					id="content"
					name="content"
					placeholder="내용"
					:value="noticeData.content"
					readonly
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ICON_LIST } from '@/utils/Constants';
import { onReadOne } from '@/utils/localStorageUtil';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

// State
const noticeData: any = ref({});

// Methods
const selectIconInfo = (id: number) => {
	const info = ICON_LIST.find(list => {
		return list.id === id;
	});
	return info;
};

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
	noticeData.value = onReadOne(id);
});
</script>
