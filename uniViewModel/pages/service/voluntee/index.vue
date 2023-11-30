<template>
	<view>
		<view class="top">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true" style="height: 240px;">
				<swiper-item v-for="item in piclist" :key="item.id">
					<view class="swiper-item">
						<image :src="base+item.imgUrl" mode=""></image>
					</view>
				</swiper-item>		
			</swiper>
		</view>
		<view class="new">
			<h3>新闻列表</h3>
			<view class="new-item" v-for="item in news" :key="item.id" @click="godet(item.id)">
				<view class="left">
					<image :src="base+item.imgUrl" mode=""></image>
				</view>
				<view class="right">
					<view class="tit">{{item.title}}</view>
					<view class="content">
						<rich-text :nodes="item.summary"></rich-text>
					</view>		
						<view class="time">{{item.createTime}}</view>
					
				</view>
			</view>
		</view>
		<view class="bottom">
			<navigator url="./voluent">
				<view class="item">
					
				<image src="../../../static/a_bef.png" style="width: 80rpx; height: 80rpx;"></image>
				<view class="tit">志愿活动</view>
				</view>
			</navigator>
			<navigator url="myvol">
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
				base:'http://124.93.196.45:10001',
				piclist:[],
				news:[],
			};
		},
		onLoad() {
			this.getpic()
			this.getnew()
		},
		methods:{
			godet(id){
				uni.navigateTo({
					url:`./newdet?id=${id}`
				})
			},
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/volunteer-service/ad-banner/list'
				})
				this.piclist=res.data
			},
			async getnew(){
				const res = await this.$NET({
					url:'/prod-api/api/volunteer-service/news/list'
				})
				this.news=res.rows
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
		image{
			width: 100%; @click="godet(item.id)"
			border-radius: 20rpx;
		}
	}
	.new{
		padding-bottom: 100rpx;
		.new-item{
			margin: 20rpx;
			padding: 20rpx;
			display: flex;
			background-color: #fff;
			border-radius: 20rpx;
			.left{
				padding-right: 20rpx;
				image{
					width: 180rpx;
					height: 150rpx;
				}
			}
			.right{
				.tit{
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp:1;
					-webkit-box-orient:vertical;
				}
				.content{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient:vertical;
				}
				.time{
					
					color: #999999;
					font-size: 13px;
				}
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
