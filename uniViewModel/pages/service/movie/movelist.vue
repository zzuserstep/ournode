<template>
	<view>
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
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
			
				movelist:[]
			};
		},
		onLoad() {
		
			this.getmove()
		},
		methods:{
			godet(id){
				uni.navigateTo({
					url:`./movedet?id=${id}`
				})
			},
			async getmove(){
				const res = await this.$NET({
					url:'/prod-api/api/movie/film/list',
					
				})
				this.movelist=res.rows.slice(1,14)
				console.log(res);
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
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
	
</style>
