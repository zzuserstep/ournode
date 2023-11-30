<template>
	<view>
		<view class="top">
			<image :src="base+data.pic" mode=""></image>
		</view>
		<view class="centre">
			
		<view class="item">
			<view class="left">房源名称：</view>
			<view class="right">{{data.sourceName}}</view>
		</view>
		<view class="item">
			<view class="left">建筑面积：</view>
			<view class="right">{{data.areaSize}}㎡</view>
		</view>
		<view class="item">
			<view class="left">房源单价：</view>
			<view class="right">{{data.price}}</view>
		</view>
		<view class="item">
			<view class="left">房源类型：</view>
			<view class="right">{{data.houseType}}</view>
		</view>
		<view class="item">
			<view class="left">房源介绍：</view>
			<view class="right">{{data.description}}</view>
		</view>
		</view>
		<view class="bottom">
			
		<button type="primary" style="width: 80%; margin: 10px 30px;" 
		@click="go" >主页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				data:[],
				base:'http://124.93.196.45:10001',
			};
		},
		onLoad(e){
			this.id=e.id
			this.getdata()
		},
		methods:{
			go(){
				uni.navigateTo({
					url:'./index'
				})
			},
			async getdata(){
				const res =await this.$NET({
					url:'/prod-api/api/house/housing/'+this.id
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
	.top{
		margin: 20rpx;
		image{
			width: 100%;
		}
	}
	.centre{
		background-color: #fff;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		.item{
			display: flex;
		.left{
			white-space: nowrap;
		}
		}
	}
	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
