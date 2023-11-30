<template>
	<view>
		<view class="det">
			<view class="item">
				<view class="left">活动名称：</view>
				<view class="right">{{data.title}}</view>
			</view>
			<view class="item">
				<view class="left">活动简介：</view>
				<view class="right">{{data.detail}}</view>
			</view>
			<view class="item">
				<view class="left">活动开始时间：</view>
				<view class="right">{{data.startAt}}</view>
			</view>
			<view class="item">
				<view class="left">人员要求：</view>
				<view class="right">{{data.requireText}}</view>
			</view>
			<view class="item">
				<view class="left">承办单位：</view>
				<view class="right">{{data.undertaker}}</view>
			</view>
			<view class="item">
				<view class="left">工作内容：</view>
				<view class="right">{{data.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[],
				id:''
			};
		},
		onLoad(e) {
			this.id=e.id
			this.getdata()
		},
		methods:{
			async getdata(){
				const res = await this.$NET({
					url:'/prod-api/api/volunteer-service/activity/'+this.id
				})
				this.data=res.data
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.det{
		background-color: #fff;
		margin: 20rpx;
		padding: 20rpx;
		.item{
			display: flex;
			padding: 20rpx;
			.left{
				white-space: nowrap;
			}
		}
	}
</style>
