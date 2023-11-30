<template>
	<view>
		<view class="top">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true" style="height: 240px;">
				<swiper-item v-for="item in piclist" :key="item.id">
					<view class="swiper-item">
						<image :src="base+item.advImg" mode=""></image>
					</view>
				</swiper-item>			
			</swiper>
		</view>
		<view class="center">
			<view class="title">缴费种类</view>
			<view class="cate">
				<view class="item" v-for="item in listcate" :key="item.id" @click="gopage(item.id)">
					<image :src="base+item.imgUrl" style="width: 90rpx; height: 90rpx;"></image>
					<view class="name">{{item.liveName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				piclist:[],
				listcate:[]
			};
		},
		onLoad() {
			this.getpic(),
			this.getcate()
			
		},
		methods:{
			gopage(id){
				
				if(id=='1'){
					uni.navigateTo({
						url:'./money'
					})
				}
			},
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/living/rotation/list'
				})
				this.piclist=res.rows
			},
			async getcate(){
				const res = await this.$NET({
					url:'/prod-api/api/living/category/list'
				})
				this.listcate=res.data
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
		.swiper-item{
			image{
				width: 100%;
				margin: 20rpx;
			}
		}
	}
	.center{
		margin: 20rpx;
		padding: 20rpx;
		.title{
			font-size: 18px;
			font-weight: bold;
			padding: 20rpx;
		}
		.cate{
			background-color: #fff;
				display: flex;
				padding: 40rpx 15rpx;
			.item{
				text-align: center;
				width: 25%;
			}
		}
	}
</style>
