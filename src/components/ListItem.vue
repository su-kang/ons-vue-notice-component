<template>
	<div class="noticeItem">
		<div class="notice_info" @click="onClickDetail">
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
			<button class="btn btn-blue" @click="onClickUpdate">수정하기</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ICON_LIST } from '@/utils/Constants';

interface Props {
	item: any;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	clickDetail: [id: number];
	clickUpdate: [id: number];
}>();

const selectIconInfo = (typeId: number) => {
	const info = ICON_LIST.find(list => {
		return list.id === typeId;
	});
	return info;
};

const onClickDetail = () => {
	emit('clickDetail', props.item.id);
};

const onClickUpdate = () => {
	emit('clickUpdate', props.item.id);
};
</script>
