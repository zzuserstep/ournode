<template>
	<view>
		<view class="calssa">
			线路名称：{{tubiaoArrqqs.name}}
		</view>
		<view class="beijingkuang" >
			<view class="calss">
				始发站:{{tubiaoArrqqs.first}}
			</view>
			<view class="calss">
				终点站:{{tubiaoArrqqs.end}}
			</view>
			<view class="calss">
				剩余时间：{{tubiaoArrqqs.endTime}}
			</view>
			<view class="calss">
				间隔时间：{{tubiaoArrqqs.startTime}}
			</view>
			<view class="calss">
				剩余距离：{{tubiaoArrqqs.km}}公里
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navaas:null,
				tubiaoArrqqs:[],
				
			}
		},
		onLoad(e) {
			
			this.getxiangqqs(e.id)
			
		},
		methods: {
			
			async getxiangqqs(id){
				const res = await this.$NET({
					url:'/prod-api/api/metro/line/'+id,
					
					
				})
				console.log(res)
				this.tubiaoArrqqs = res.data
				
			},
			
		}
	}
</script>

<style lang="scss">
	.calss{
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}
.calssa{
	text-align: center;
	font-size: 36rpx;
	color: #333;
	padding-top: 30rpx;
	font-weight: bold;
	padding-bottom: 20rpx;
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
