<template>
	<view>
		<view class="tops">
			<u-search @custom="set" @search="set" v-model="search"></u-search>
		</view>
		<view class="top">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" 
			circular="true" style="height: 230px;">
				<swiper-item v-for="item in piclist" :key="item.id">
					<view class="swiper-item">
						<image :src="base+item.imgUrl" mode=""></image>
					</view>
				</swiper-item>			
			</swiper>
		</view>
		<view class="service">
			<h3>公益分类</h3>
			<view class="services">
				<view class="item" v-for="item in servicelist" :key="item.id" @click="gopage(item.id)">
					<image :src="base+item.imgUrl" style="width: 70rpx; height: 70rpx;"></image>
					<view class="name">{{item.name}}</view>
				</view>			
			</view>
		</view>
		<view class="newslist">
			<h3>推荐公益</h3>
			<view class="item" v-for="(item,index) in newslist" :key="index" >
				<view class="left">
					<image :src="base+item.imgUrl" mode=""></image>
				</view>
				<view class="right">
					<view class="tit">公益项目：{{item.name}}</view>
					<view class="content">发布组织：{{item.author}}</view>				
					<view class="comment">捐赠人数：{{item.donateCount}}</view>
					<view class="time">已筹善款：{{item.moneyNow}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'',
				piclist:[],
				base:'http://124.93.196.45:10001',
				piclist:[],
				servicelist:[],
				newslist:[]
			};
		},
		onLoad() {
			this.getpic(),
			this.getservice(),
			this.getnewlist()
		},
		methods:{
			godet(e){
				uni.navigateTo({
					url:`./det?num=${encodeURIComponent(JSON.stringify(e))}`
				})
			},
			gopage(id){
				console.log('1');
				uni.navigateTo({
					url:`./gonglist?id=${id}`
				})
			},
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/public-welfare/ad-banner/list'
				})
				this.piclist=res.data
				console.log(res);
			},
			async getservice(){
				const res = await this.$NET({
					url:'/prod-api/api/public-welfare/public-welfare-type/list'
				})
				this.servicelist=res.data
				console.log(res);
			},
			async getnewlist(){
				const res = await this.$NET({
					url:'/prod-api/api/public-welfare/public-welfare-activity/recommend-list',
					data:{
						pageNum:1,
						pageSize:5
					}
				})
				this.newslist=res.rows
				console.log(res);
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.tops{
		margin: 20rpx;
	}
	.top{
		margin: 20rpx;
		
		image{
			width: 100%;
		}
	}
	.service{
		margin: 20rpx;
		.services{
			background-color: #FFFFFF;
			border-radius: 20rpx;
			display: flex;
			flex-wrap: wrap;
			.item{
				width: 25%;
				text-align: center;
				padding: 15rpx 0;
			}
			.name{
				font-size: 14px;
			}
		}
	}
	.newslist{
		margin: 20rpx;
		
		.item{
			display: flex;
			background-color: #fff;
			border-radius: 20rpx;
			margin: 20rpx;
			padding: 20rpx;
			.left{
				padding-right: 20rpx;
				image{
					width: 180rpx;
					height: 150rpx;
				}
			}
		}
	}
</style>
