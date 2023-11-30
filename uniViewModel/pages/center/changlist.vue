<template>
	<view>
		<view class="fac">
			<h3>工业服务</h3>
			<navigator url="changdet">
			<view class="item" v-for="item in 4">			
			<view class="left">
				<image src="../../static/center/c1.png" style="width: 180rpx; height: 150rpx;"></image>
			</view>
			<view class="right">
				<view class="title" >
					深圳市大疆创新科技有限公司
				</view>
			</view>
			</view>
			</navigator>
		</view>
		<view class="fac">
			<h3>工业互联网</h3>
			<navigator url="changdett">
			<view class="item"  v-for="item in 4">			
			<view class="left">
				<image src="../../static/center/c5.png" style="width: 180rpx; height: 150rpx;"></image>
			</view>
			<view class="right">
				<view class="title">
					上海电气
				</view>
			</view>
			</view>
			</navigator>
		</view>
		<view class="fac">
			<h3>工业软件</h3>
			<navigator url="changdeth">
			<view class="item" v-for="item in 4">			
			<view class="left">
				<image src="../../static/center/c6.png" style="width: 180rpx; height: 150rpx;"></image>
			</view>
			<view class="right">
				<view class="title">
				海尔智家
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
	.fac{
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
