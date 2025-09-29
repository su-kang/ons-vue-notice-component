<template>
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
			<!-- ListItem Component -->
			<ListItem
				v-for="item in noticeList"
				:key="item.id"
				:item="item"
				@click-detail="onClickDetail"
				@click-update="onClickUpdate"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import ListItem from '@/components/ListItem.vue';
import { onRead } from '@/utils/localStorageUtil';
import { onMounted, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// NoticeList state
const noticeList: any = reactive([]);
const searchParams: any = reactive({
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

const onClickDetail = (id: number) => {
	router.push(`/detail?id=${id}`);
};

const onClickUpdate = (id: number) => {
	router.push(`/update/${id}`);
};

// Watch searchParams changes
watch(
	searchParams,
	() => {
		noticeList.splice(0, noticeList.length, ...onRead(searchParams));
		console.log('noticeList', noticeList, searchParams);
	},
	{ deep: true },
);

// Lifecycle
onMounted(() => {
	noticeList.splice(0, noticeList.length, ...onRead(searchParams));
});
</script>
