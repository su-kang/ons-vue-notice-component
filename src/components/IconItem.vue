<template>
	<section class="list_wrapper_item">
		<div
			v-for="item in ICON_LIST"
			:key="item.id"
			class="typeItem"
			:class="{ selected: item.id === selectedTypeId }"
			@click="onClickItem(item)"
		>
			<img :src="item.icon" />
			<span>{{ item.name }}</span>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ICON_LIST } from '@/utils/Constants';

// Props
interface Props {
	selectedTypeId: number;
}

defineProps<Props>();

// Emits
const emit = defineEmits<{
	clickItem: [item: any];
}>();

// Methods
const onClickItem = (item: any) => {
	emit('clickItem', item);
};
</script>
