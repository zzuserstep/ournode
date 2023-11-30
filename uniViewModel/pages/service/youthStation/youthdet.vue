<template>
	<view>
		<view class="top">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 250px;" circular="true">
				<swiper-item v-for="item in dataarr.imageUrlList">
					<view class="swiper-item">
						<image :src="base+item" mode=""></image>
					</view>
				</swiper-item>			
			</swiper>
		</view>
		<view class="where">
			<view class="address">
				<image src="../../../static/icons/postion.png" style="width: 60rpx; height: 60rpx;"></image>
				<view class="inaddress">{{dataarr.address}}</view>
			</view>
			<view class="active">
				<view class="left">联系电话:</view>
				<view class="right">{{dataarr.phone}}</view>
			</view>
			<view class="active">
				<view class="left">入住时间:</view>
				<view class="right">{{dataarr.workTime}}</view>
			</view>
			<view class="bednum">
				<view>剩余床位</view>
				<view class="sex">						
				<text class="boy">男:{{dataarr.bedsCountBoy}}</text><text class="girl">女:{{dataarr.bedsCountGirl}}</text>
				</view>
			</view>	
			
		</view>
		<view class="detail">
			<view class="introduce">
				<view class="left">驿站简介:</view>
				<view class="right">{{dataarr.introduce}}</view>
			</view>
			<view class="introduce">
				<view class="left">房间配置:</view>
				<view class="right">{{dataarr.internalFacilities}}</view>
			</view>
			<view class="introduce">
				<view class="left">周边配套:</view>
				<view class="right">{{dataarr.surroundingFacilities}}</view>
			</view>
			<view class="introduce">
				<view class="left">特色服务:</view>
				<view class="right">{{dataarr.specialService}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				dataarr:[]
			};
		},
		onLoad(e) {
			this.getyouthdet(e.id)
		},
		methods:{
			async getyouthdet(id){
				const res = await this.$NET({
					url:'/prod-api/api/youth-inn/youth-inn/'+id
				})
				this.dataarr=res.data
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.top{
		margin: 20rpx;
		image{
			width: 100%;
			border-radius: 20rpx;
		}
	}
	.where{
			background-color: #fff;
			padding: 20rpx;
			margin: 20rpx;
			border-radius: 20rpx;
			.address{
				padding: 10rpx 0;
				display: flex;
			}
			.active{
				display: flex;
				padding: 10rpx 0;
				.right{
					padding-left: 20rpx;
				}
			}
			.bednum{
				padding: 10rpx;
				.sex{
					padding: 10rpx;
				}
				.girl{
					padding-left: 60px;
				}
			}
		}
	
	.detail{
		background-color: #fff;
		margin: 60rpx 20rpx;
		border-radius: 20rpx;
		.introduce{
			display: flex;
			padding: 20rpx;
			.left {
				white-space: nowrap;
				padding-right: 10rpx;
			}
		}
	}
</style>
