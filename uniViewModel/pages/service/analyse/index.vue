<template>
	<view>
		<view class="title">北京市16号线、14号线东段周客运量</view>
		<qiun-data-charts  type="column" :chartData="chartData"   />
		<view class="title">021年-10月-22日至2021年-10月28日7天，北京市西苑、石厂、阎村东、香山地铁站出站的客流量</view>
		<qiun-data-charts  type="line" :chartData="chartDatas"   />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chartData:{
					 categories: ["周一","周二","周三","周四","周五","周六","周日"],
				     series: [
				       {
				         name: "十六号",
				         data: [35000,36000,31000,33000,13000,24000,29000]
				       },
				       {
				         name: "十四号",
				         data: [18000,27000,21000,24000,6000,28000,12000]
				       }
				     ]
				},
				chartDatas:{
					 categories: ["22","23","24","25","26","27","28"],
				     series: [
				       {
				         name: "西苑",
				         data: [350,360,310,330,130,240,290]
				       },
				       {
				         name: "石厂",
				         data: [180,270,210,240,60,280,120]
				       },
					   {
					     name: "阎村东",
					     data: [280,290,240,140,160,290,90]
					   },
					   {
					     name: "香山",
					     data: [130,210,290,310,120,200,190]
					   }
				     ]
				},
			};
		}
	}
</script>

<style lang="scss">
	.title{
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		margin: 20rpx;
	}
</style>
