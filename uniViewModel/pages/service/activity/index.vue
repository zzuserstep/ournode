<template>
	<view>
		<view class="top">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" 
			circular="true" style="height: 230px;">
				<swiper-item v-for="item in piclist" :key="item.id">
					<view class="swiper-item">
						<image :src="base+item.advImg" mode=""></image>
					</view>
				</swiper-item>			
			</swiper>
		</view>
		<view class="cate">
			<view :class="num==index?'item active':'item'" 
			v-for="(item,index) in catelist" :key="item.id" @click="changes(index,item.id)">{{item.name}}</view>
		</view>
		<view class="activlist">
			<view class="items" v-for="(item,index) in activlist" :key="index" @click="godet(item.id)">
				<view class="left">
					<image :src="base+item.imgUrl" mode=""></image>
				</view>
				<view class="right">
					<view class="tit">{{item.name}}</view>				
					<view class="bot">
						<view class="comment">报名人数：{{item.signupNum}}</view>
						<view class="time">点赞数：{{item.likeNum}}</view>
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
				base:'http://124.93.196.45:10001',
				piclist:[],
				catelist:[],
				num:0,
				type:1,
				activlist:[]
			};
		},
		onLoad() {
			this.getpic(),
			this.getcate(),
			this.getactive()
		},
		methods:{
			godet(id){
				uni.navigateTo({
					url:`./activdet?id=${id}`
				})
			},
			changes(e,id){
				this.num=e,
				this.type=id
				this.getactive()
			},
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/activity/rotation/list'
				})
				this.piclist=res.rows
				// console.log(res);
			},
			async getcate(){
				const res = await this.$NET({
					url:'/prod-api/api/activity/category/list'
				})
				this.catelist=res.data
				console.log(res);
			},
			async getactive(){
				const res = await this.$NET({
					url:'/prod-api/api/activity/activity/list',
					data:{
						categoryId:this.type
					}
				})
				this.activlist=res.rows
				console.log(res);
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
			width: 100%;
		}
	}
	.cate{
		width: 100%;
		height: 80rpx;
		background-color: #fff;
		display: flex;
		.item{
			line-height: 80rpx;
			padding: 0 30rpx;
			font-weight: bold;
			&.active{
				color: #007AFF;
			}
		}
	}
	.activlist{
		.items{
			margin: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
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
					-webkit-line-clamp:2;
					-webkit-box-orient:vertical;
				}
				
				.bot{
					display: flex;
					padding-top: 30rpx;
					justify-content: space-between;
					color: #A5A5A5;
				}
			}
		}
	}
</style>
