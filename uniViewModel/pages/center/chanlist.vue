<template>
	<view>
		<view class="prod">
			<h3>产品列表</h3>
			<navigator url="chandet">
			<view class="item" v-for="item in 6">			
			<view class="left">
				<image src="../../static/center/c3.png" style="width: 180rpx; height: 150rpx;"></image>
			</view>
			<view class="right">
				<view class="title">
					电动扫地车
				</view>
			</view>
			</view>
			</navigator>
		</view>
		<view class="anli">
			<h3>解决方案</h3>
			<navigator url="andet">
			<view class="item" v-for="item in 6">			
			<view class="left">
				<image src="../../static/center/c2.png" style="width: 180rpx; height: 150rpx;"></image>
			</view>
			<view class="right">
				<view class="title">
				华为智慧园区解决方案
				</view>
			</view>
			</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.fac,.prod,.anli,.zhan{
		margin: 20rpx;
		padding: 20rpx;
		.item{
			display: flex;
			align-items: center;
			background-color: #fff;
			border-radius: 20rpx;
			// margin: 20rpx;
			padding: 20rpx;
			.right{
				padding-left: 20rpx;
				.title{
					font-size: 20px;
					font-weight: bold;
				}
			}
		}
	}
</style>
