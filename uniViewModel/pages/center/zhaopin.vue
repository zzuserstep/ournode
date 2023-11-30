<template>
	<view>
		<view class="zhaopin">
			<h3>招聘列表</h3>
			<view class="item" v-for="item in 15">
				<view class="tit">招聘岗位：智能服务</view>
				<view class="tit">招聘公司：北汽公司</view>
				<view class="tit">招聘薪资：5000</view>
				<view class="tit">联系人：张女士</view>
				<view class="btn" @click="set">提交简历</view>
			</view>
		</view>
		<view class="bottom">
			<h3>校企合作</h3>
			<image src="../../static/center/c2.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			set(){
				uni.showToast({
					title:'提交成功',
					icon:'success'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.zhaopin{
		margin: 20rpx;
		padding: 20rpx;
		.item{
			padding: 20rpx;
			background-color: #fff;
			border-radius: 20rpx;
			.tit{
				padding: 10rpx 0;
			}
		}
	}
	.btn{
		width: 600rpx;
		height: 80rpx;
		margin: 20rpx;
		border-radius: 30rpx;
		background-color: #007AFF;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
	}
	.bottom{
		margin: 20rpx;
		padding: 20rpx;
		image{
			width: 100%;
		}
	}
</style>
