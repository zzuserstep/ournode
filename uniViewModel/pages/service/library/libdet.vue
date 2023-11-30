<template>
	<view>
		<view class="top">
			<image :src="base+dataarr.imgUrl" mode=""></image>
		</view>
		<view class="center">
			<view class="item">
				<view class="left">名称：</view>
				<view class="right">{{dataarr.name}}</view>
			</view>
			<view class="item">
				<view class="left">地址：</view>
				<view class="right">{{dataarr.address}}</view>
			</view>
			<view class="item">
				<view class="left">介绍：</view>
				<view class="right">{{dataarr.description}}</view>
			</view>
			<view class="item">
				<view class="left">营业时间：</view>
				<view class="right">{{dataarr.businessHours}}</view>
			</view>
			<view class="item">
				<view class="left">营业状态：</view>
				<view class="right">{{dataarr.businessState=='1'?'营业中':'休息中'}}</view>
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
			this.getlib(e.id)
			
		},
		methods:{
			async getlib(id){
				const res = await this.$NET({
					url:'/prod-api/api/digital-library/library/'+id
				})
				console.log(res);
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
		margin: 30rpx;
		image{
			width: 100%;
		}
	}
	.center{
		margin: 40rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		.item{
			display: flex;
			// align-items: center;
			padding: 15rpx;
			.left{
				white-space: nowrap;
				padding-left: 20rpx;
			}
		}
	}
</style>
