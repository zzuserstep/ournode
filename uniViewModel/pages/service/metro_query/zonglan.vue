<template>
	<view>
		<view class="zhuanti">
			地铁信息
		</view>
		<view class="ssss">
			<image :src="base+pic.imgUrl" mode="widthFix"></image>
		</view>
				<view class="beijingkuang" v-for="item in tubiaoArrqq">
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
				tubiaoArrqq:[],
				base:'http://124.93.196.45:10001',
				pic:[]
			}
		},
		onLoad() {
			this.getxiangqq()
			this.getpic()
		},
		methods: {
			async getpic(){
				const res =await this.$NET({
					url:'/prod-api/api/metro/city'
				})
				console.log(res);
				this.pic=res.data
			},
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
		}
	}
</script>

<style lang="scss">
	.ssss{
		width: 680rpx;
		height: 430rpx;
		padding-left: 30rpx;
		padding-bottom: 20rpx;
		image{
			width: 100%;
			height: 100%;
		}
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
