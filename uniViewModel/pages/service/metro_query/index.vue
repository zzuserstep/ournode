<template>
	<view>
		<view class="aiusdhia" @click="gettiao()">
			总览图
		</view>
		
		<view class="zhuanti">
			地铁信息
		</view>
		
		<view class="beijingkuang" v-for="item in tubiaoArrqq" @click="getxiangqing(item)">
			<view class="calss">
				线路名称：{{item.lineName}}
			</view>
			<view class="calss">
				站点名称：{{item.preStep.name}}
			</view>
			<view class="calss">
				下一站信息：{{item.nextStep.name}}
			</view>
			<view class="calss">
				达到本站时长：{{item.reachTime}}分钟
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tubiaoArrqq:[]
			}
		},
		onLoad() {
			this.getxiangqq()
		},
		methods: {
			async getxiangqq(){
				const res = await this.$NET({
					url:'/prod-api/api/metro/list',
					data:{
						currentName:'建国门'
					}
				})
				console.log(res)
				this.tubiaoArrqq = res.data
			},
			gettiao(){
				uni.navigateTo({
					url:'./zonglan'
				})
			},
			getxiangqing(item){
				console.log(item);
				uni.navigateTo({
					url:`xiangqing?id=${item.lineId}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.aiusdhia{
		font-size: 36rpx;
		padding-top: 30rpx;
		padding-left: 600rpx;
		color: #666;
	}
	.calss{
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}
.zhuanti{
			color: #333;
			font-size: 36rpx;
			font-weight: bold;
			padding-left: 50rpx;
			padding-top: 40rpx;
			padding-bottom: 10rpx;
			margin-bottom: 30rpx;
		}
		.beijingkuang{
			width: 650rpx;
			margin-top: 20rpx;
			margin-left: 30rpx;
			height: auto;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			padding-left: 30rpx;
			background-color: #F8F8F8;
			border: 1px solid #eee;
			border-radius: 20rpx;
		}
</style>
