<template>
	<view>
		<view class="top" v-show="showo">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true" style="height: 310px;">
				<swiper-item v-for="item in detarr.newsList" :key='item.id'>
					<view class="swiper-item">
						<image :src="base+item.imgUrl" mode=""></image>
						<view class="name">{{item.title}}</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="all">
		<view class="item">
			<view class="left">公司简介：</view>
			<view class="right">			
			<rich-text :nodes="detarr.introduce"></rich-text>
			</view>
		</view>
		<view class="item">
			<view class="left">运输方式：</view>	
			<view class="right">{{detarr.shippingMethod}} </view>
		</view>	
		</view>
			<view class="title"  v-show="showt">运输价格</view>
		<view class="money" v-for="item in detarr.priceList" :key="item.id" v-show="showt">
			<view class="item">
				<view class="left">运输地区：</view>
				<view class="right">{{item.areaName}}</view>
			</view>
			<view class="item">
				<view class="left">文件首重：</view>
				<view class="right">{{item.fileStart}}kg</view>
			</view>
			<view class="item">
				<view class="left">文件递增价格：</view>
				<view class="right">{{item.fileStep}}元</view>
			</view>
			<view class="item">
				<view class="left">物品首重：</view>
				<view class="right">{{item.objStart}}kg</view>
			</view>
			<view class="item">
				<view class="left">物品递增价格：</view>
				<view class="right">{{item.objStep}}元</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				detarr:[],
				id:'',
				showo:true,
				showt:true
			}
		},
		 onLoad(e) {
			 this.id=e.id
		 	this.getdet()
			
		 },
		methods: {
			async getdet(){
				const res = await this.$NET({
					url:'/prod-api/api/logistics-inquiry/logistics_company/'+this.id
				})
				
				this.detarr=res.data
				this.showo=res.data.newsList.length>0?true:false
				this.showt=res.data.priceList.length>0?true:false
				console.log(this.detarr);
			},
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
			text-align: center;
			image{
				width: 100%;
			}
			
		}
	}
	.all{
		background-color: #fff;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
	}
	.item{
		display: flex;
		padding: 15rpx 0;
		.left{
			white-space: nowrap;
		}
	}
	.title{
		font-size: 16px;
		font-weight: bold;
		margin: 20rpx;
		
	}
	.money{
		background-color: #fff;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
	}
</style>
