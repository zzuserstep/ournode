<template>
	<view>
		
		<view class="all">
			<view class="item">
				<view class="left">违章时间：</view>
				<view class="right">{{dataarr.badTime}}</view>
			</view>
			<view class="item">
				<view class="left">违章地点：</view>
				<view class="right">{{dataarr.illegalSites}}</view>
			</view>
			<view class="item">
				<view class="left">违章记分：</view>
				<view class="right">{{dataarr.deductMarks}}</view>
			</view>
			<view class="item">
				<view class="left">罚款金额：</view>
				<view class="right">{{dataarr.money}}</view>
			</view>
			<view class="item">
				<view class="left">违法行为：</view>
				<view class="right">{{dataarr.trafficOffence}}</view>
			</view>
			<view class="item">
				<view class="left">通知书号：</view>
				<view class="right">{{dataarr.noticeNo}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataarr:[],
				id:'12'
			};
		},
		onLoad(e) {
			// this.id=e.id
			this.getdata()
		},
		methods:{
			async getdata(){
				const res = await this.$NET({
				url:'/prod-api/api/traffic/illegal/'+this.id,
				})
				this.dataarr=res.data
				console.log(res);
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.all{
		margin: 20rpx;
	
			background-color: #fff;
		.item{
			margin: 20rpx;
			padding: 20rpx;
			border-radius: 20rpx;
			display: flex;
			.left{
				white-space: nowrap;
				padding-right: 20rpx;
			}
		}
	}
</style>
