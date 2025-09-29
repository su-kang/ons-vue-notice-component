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

		<!-- NoticeList Component -->
		<div class="notice">
			<div class="menu_bar">
				<select name="searchOrder" @change="onChangeSelectEvent">
					<option value="desc">최신순</option>
					<option value="asc">오래된 순</option>
				</select>
				<input
					type="text"
					id="title"
					name="title"
					placeholder="제목 검색"
					@input="onChangeInputEvent"
				/>
				<input
					type="text"
					id="createName"
					name="createName"
					placeholder="작성자 검색"
					@input="onChangeInputEvent"
				/>
			</div>
			<div class="list_wrapper">
				<div v-if="noticeList.length === 0" class="empty-message">
					등록된 게시글이 없습니다.
				</div>
				<div v-for="item in noticeList" :key="item.id" class="noticeItem">
					<!-- NoticeItem Component -->
					<div class="notice_info" @click="onClickDetail(item.id)">
						<div class="img_section">
							<img :src="selectIconInfo(item.typeId)?.icon" />
						</div>
						<div class="info_section">
							<div class="title">{{ item?.title }}</div>
							<div class="subinfo">
								<div>작성자: {{ item?.createName }}</div>
								<div>수정일: {{ item?.updateDate }}</div>
							</div>
						</div>
					</div>
					<div class="button_section">
						<button class="btn btn-blue" @click="onClickUpdate(item.id)">
							수정하기
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import { ICON_LIST } from '@/utils/Constants';
import { onRead } from '@/utils/localStorageUtil';
import { onMounted, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// NoticeList state
const noticeList: any = reactive([]);
const searchParams = reactive({
	order: 'desc',
	title: '',
	createName: '',
});

// Methods
const onChangeSelectEvent = (event: Event) => {
	const target = event.target as HTMLSelectElement;
	searchParams.order = target.value;
	console.log('event', target.value);
};

const onChangeInputEvent = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const name = target.name;
	const value = target.value;

	searchParams[name] = value;
};

const selectIconInfo = (typeId: number) => {
	const info = ICON_LIST.find(list => {
		return list.id === typeId;
	});
	return info;
};

const onClickDetail = (id: number) => {
	router.push(`/detail?id=${id}`);
};

const onClickUpdate = (id: number) => {
	router.push(`/update/${id}`);
};

const navigateToRegist = () => {
	router.push('/regist');
};

// Watch searchParams changes
watch(
	searchParams,
	() => {
		Object.assign(noticeList, onRead(searchParams));
	},
	{ deep: true },
);

// Lifecycle
onMounted(() => {
	Object.assign(noticeList, onRead(searchParams));
});
</script>
