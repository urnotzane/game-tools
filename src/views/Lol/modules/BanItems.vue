<template>
	<!-- 双方ban列表各占25vw，按照最多5个ban位计算，每个ban位为5vw宽度，因此高度也为5vw -->
	<div class="flex h-[72px] border-t border-gray-400" :class="{
			'flex-row-reverse': isRedTeam,
		}">
		<div class="border-r w-[72px] h-full box-content border-gray-400" :class="{
			'border-l border-r-0': isRedTeam,
			'blink-animation': banChamps?.[banIndex -1]?.isInProgress,
		}" v-for="banIndex in banLimit" :key="banIndex">
			<img class="w-full h-full" v-if="banChamps?.[banIndex -1]?.id" :src="banChamps[banIndex - 1].imgUrl" />
			<div class="w-full h-full relative" v-else>
				<div class="w-[1px] bg-red-600 h-[80%] -rotate-45 absolute left-[50%] top-[50%] translate-y-[-50%]" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { LolSpace } from '@/types/lol';
import { computed } from 'vue';

const props = defineProps<{
	banLimit: number;
	banChamps?: LolSpace.BanChamp[];
	team?: LolSpace.TeamType;
}>()

const isRedTeam = computed(() => props.team === LolSpace.TeamType.red)
</script>