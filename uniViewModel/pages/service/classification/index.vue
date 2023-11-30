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
		<view class="icon">
			<navigator url="sou">
				
			<view class="sou">搜索</view>
			</navigator>
			<navigator url="fen">
				
			<view class="fen">分类</view>
			</navigator>
		</view>
		<view class="new">
			<scroll-view scroll-x="true" class="nav">
				<view v-for="(item,index) in navlist" :key="index" 
				:class="num==index?'navs active':'navs'" @click="change(index,item.id)">{{item.name}}</view>
			</scroll-view>
			<view class="item" v-for="item in newlist" :key="item.id" @click="godet(item.id)">
				<view class="left">
					<view class="title">{{item.title}}</view>
					<view class="time">{{item.createTime}}</view>
				</view>
				<view class="right">
					<image :src="base+item.imgUrl" mode=""></image>
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
				id:null,
				num:0,
				navlist:[],
				newlist:[],
				type:7
			};
		},
		onLoad() {
			this.getpic()
			this.getnav()
			this.getnew()
			
		},
		methods:{
			godet(id){
				uni.navigateTo({
					url:`./newsdet?id=${id}`
				})
			},
			change(i,id){
				this.num=i
				this.type=id
				this.getnew()
			},
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/garbage-classification/ad-banner/list'
				})
				this.piclist=res.data
			},
			async getnav(){
				const res = await this.$NET({
					url:'/prod-api/api/garbage-classification/news-type/list'
				})
				console.log(res);
				this.navlist=res.rows
			},
			async getnew(){
				const res = await this.$NET({
					url:'/prod-api/api/garbage-classification/news/list',
					data:{
						type:this.type
					}
				})
				this.newlist=res.rows
				// console.log(res);
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
			image{
				width: 100%;
			}
		}
	}
	.icon{
		margin: 20rpx;
		display: flex;
		justify-content: space-between;
		.sou{
			// padding: 20rpx;
			border-radius: 20rpx;
			width: 300rpx;
			height: 150rpx;
			text-align: center;
			line-height: 150rpx;
			font-size: 25px;
			font-weight: bold;
			color: #fff;
			background-color: #F0AD4E;
			box-shadow: 2px 5px 5px #CCCCCC;
		}
		.fen{
			// padding: 20rpx;
			border-radius: 20rpx;
			width: 300rpx;
			height: 150rpx;
			text-align: center;
			line-height: 150rpx;
			font-size: 25px;
			font-weight: bold;
			color: #fff;
			background-color: #67f034;
			box-shadow: 2px 5px 5px #CCCCCC;
		}
	}
	.new{
		.nav{
			background-color: #fff;
			width: 100%;
			height: 80rpx;
			position: sticky;
			z-index: 10;
			left: 0;
			top: var(--window-top);
			white-space: nowrap;
			
			.navs{
				display: inline-block;
				line-height: 80rpx;
				font-weight: bold;
				padding: 0 30rpx;
				&.active{
					color: #007AFF;
				}
			}
		}
		
		.item{
			margin: 20rpx;
			padding: 20rpx;
			display: flex;
			background-color: #fff;
			border-radius: 20rpx;
			box-shadow: 2px 5px 5px #CCCCCC;
			.right{
				image{
					width: 180rpx;
					height: 150rpx;
					// position: fixed;
					// right: 20rpx;
				}
				// padding-right: 20rpx;
			}
			.left{
				.title{
					font-size: 20px;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient:vertical;
				}
				
				.time{
					padding: 20rpx;
					color: #CCCCCC;
				}
			}
		}
	}
</style>
