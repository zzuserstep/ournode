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
		<view class="tops">
			<u-search @custom="set" @search="set" v-model="search"></u-search>
		</view>
		<h3>关键词</h3>
		<view class="showlist" v-for="item in wordlist" :key="item.id">{{item.keyword}}	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				piclist:[],
				search:'',
				wordlist:[]
			};
		},
		onLoad() {
			this.getpic()
			this.getword()
		},
		methods:{
			set(){
				uni.navigateTo({
					url:`soudet?num=${this.search}`
				})
			},
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/garbage-classification/ad-banner/list'
				})
				this.piclist=res.data
			},
			async getword(){
				const res = await this.$NET({
					url:'/prod-api/api/garbage-classification/garbage-classification/hot/list',
					data:{
						pageNum:1,
						pageSize:20
					}
				})
				console.log(res);
				this.wordlist=res.data
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
		.swiper-item{
			image{
				width: 100%;
			}
		}
	}
	.showlist{
		padding: 10rpx 40rpx;
	}
</style>
