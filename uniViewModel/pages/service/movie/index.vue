<template>
	<view>
		<view class="tops">
			<u-search @custom="set" @search="set" v-model="search"></u-search>
		</view>
		<view class="top">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true" style="height: 240px;">
				<swiper-item v-for="item in piclist" :key="item.id">
					<view class="swiper-item">
						<image :src="base+item.advImg" mode=""></image>
					</view>
				</swiper-item>		
			</swiper>
		</view>
		<view class="bot">
			<view class="tops">
				<view class="tit">电影展示区</view>
				<navigator url="./movelist">
					
				<view class="more">查看更多</view>
				</navigator>
			</view>
			<view class="item" v-for="item in movelist" :key="item.id" @click="godet(item.id)">
				<view class="left">
					<image :src="base+item.cover" mode=""></image>
				</view>
				<view class="right">
					<view class="name">{{item.name}}</view>
					<view class="notiem">时长：{{item.duration}}分钟</view>
					<view class="tiem">上映时间：{{item.playDate}}</view>
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
				movelist:[],
				search:''
			};
		},
		onLoad() {
			this.getpic()
			this.getmove()
		},
		methods:{
			godet(id){
				uni.navigateTo({
					url:`./movedet?id=${id}`
				})
			},
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/movie/rotation/list'
				})
				this.piclist=res.rows
			},
			async getmove(){
				const res = await this.$NET({
					url:'/prod-api/api/movie/film/list',
					data:{
						pageNum:1,
						pageSize:5
					}
				})
				this.movelist=res.rows.slice(1,5)
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
			width: 100%; @click="godet(item.id)"
			border-radius: 20rpx;
		}
	}
	.bot{
		.tops{
			display: flex;
			justify-content: space-between;
			margin: 20rpx;
			padding: 20rpx;
			.tit{
				font-weight: bold;
			}
		}
		.item{
			margin: 20rpx;
			background-color: #fff;
			padding: 20rpx;
			display: flex;
			.left{
				image{
					width: 180rpx;
					height: 150rpx;
				}
				padding-right: 20rpx;
			}
			.right{
				.name{
					font-size: 20px;
					font-weight: bold;
				}
				.notime{
					padding: 20rpx 0;
				}
			}
		}
	}
</style>
