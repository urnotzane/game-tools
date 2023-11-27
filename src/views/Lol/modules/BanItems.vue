<template>
	<!-- 双方ban列表各占25vw，按照最多5个ban位计算，每个ban位为5vw宽度，因此高度也为5vw -->
	<div class="flex h-[54px]" :class="{
			'flex-row-reverse': team === LolSpace.TeamType.red,
		}">
		<div class="border w-[54px] h-full box-content" v-for="banIndex in banLimit" :key="banIndex">
			<img class="w-full h-full" v-if="banChamps[banIndex -1]" :src="banChamps[banIndex - 1].imgUrl" />
			<div class="w-full h-full bg-gray-100 relative" v-else>
				<div class="w-[1px] bg-red-600 h-[80%] -rotate-45 absolute left-[50%] top-[50%] translate-y-[-50%]" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { LolSpace } from '@/types/lol.ts';

const props = defineProps<{
	banLimit: number;
	banChamps: LolSpace.BanChamp[];
	team?: LolSpace.TeamType;
}>()

onMounted(() => {
	console.log(props.team);
	
})
</script>