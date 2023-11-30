<template>
	<view>
		<view class="top">
			
		<view :class="num==0?'item active':'item'" @click="setcode(0)">已完成</view>
		<view :class="num==1?'item active':'item'" @click="setcode(1)">已报名</view>
		<view :class="num==2?'item active':'item'" @click="setcode(2)">已取消</view>
		</view>
		<swiper style="height: calc(100vh - 100rpx);" :current="num" @change="set" class="swiper">
			<swiper-item>
				<view class="swiper-item">
					<view class="no">还未有</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="no">还未有</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="no">还未有</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="bottom">
			<navigator url="./voluent">
				<view class="item">
					
				<image src="../../../static/a_bef.png" style="width: 80rpx; height: 80rpx;"></image>
				<view class="tit">志愿活动</view>
				</view>
			</navigator>
			<navigator url="mtyvol">
				<view class="item">
					
				<image src="../../../static/my_bef.png" style="width: 80rpx; height: 80rpx;"></image>
				<view class="tit">我的活动</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:0
			};
		},
		methods:{
			setcode(i){
				this.num=i
			},
			set(e){
				console.log(e);
				this.num=e.detail.current
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.top{
		display: flex;
		justify-content: center;
		.item{
			font-size: 18px;
			font-weight: bold;
			padding: 20rpx 50rpx;
			&.active{
				color: #E43D33;
				border-bottom: 4px solid #E43D33;
			}
		}
	}
	.swiper{
		.swiper-item{
			.no{
				font-size: 20px;
				font-weight: bold;
				width: 680rpx;
				height: 200rpx;
				margin: 30rpx ;
				background-color: #fff;
				border-radius: 20rpx;
				text-align: center;
				line-height: 200rpx;
			}
		}
	}
	.bottom{
		width: 100%;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		position: fixed;
		z-index: 10;
		bottom: 0;
		.item{
			padding: 0 60rpx;
			text-align: center;
		}
	}
</style>
