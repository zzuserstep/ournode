<template>
	<view>
		<view class="tops">
			<u-search @custom="set" @search="set" v-model="search"></u-search>
		</view>
		<view class="top">	
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper" style="height: 200px;" circular="true">
			<swiper-item v-for="item in imaglist" :key="item.id">
				<view class="swiper-item" >
					<image :src="base+item.imgUrl"></image>
				</view>
			</swiper-item>
		</swiper>
		</view>
		<view class="company">
			<view class="title">推荐快递</view>
			<view class="items">
				<view class="children">
					<uni-grid :column="4" :show-border="false" :square="true">
						<uni-grid-item v-for="(item,index) in companylist"  @click.native="godetail(item.id)">
							<image :src="base+item.imgUrl" style="width: 60rpx ; height: 60rpx;" class="icon"></image>
							<view class="txt">{{item.name}}</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
			<view class="titlet">其他快递</view>
			<view class="item" v-for="item in othercom" :key='item.id' @click="godetail(item.id)">
				<image :src="base+item.imgUrl" mode=""></image>
				<view class="name">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				search:'',
				imaglist:[],
				companylist:[],
				othercom:[]
			};
		},
		onLoad() {
			this.getimg(),
			this.getcompany()
		},
		methods:{
			godetail(id){
				uni.navigateTo({
					url:`./companydet?id=${id}`
				})
			},
			async getimg(){
				const res = await this.$NET({
					url:'/prod-api/api/logistics-inquiry/ad-banner/list'
				})
				
				this.imaglist=res.data
				console.log(this.imaglist);
			},
			async getcompany(){
				const res = await this.$NET({
					url:'/prod-api/api/logistics-inquiry/logistics_company/list',
				})
				console.log(res);
				this.companylist=res.data.slice(0,12)
				this.othercom=res.data.slice(12,50)
				console.log(this.othercom);
			}
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
		.swiper{
			.swiper-item{
				image{
					width: 100%;
				}
			}
		}
	}
	.company{
		.title,.titlet{
			font-size: 18px;
			font-weight: bold;
			margin: 20rpx;
		}
	.children{
		 text-align: center;
		 font-size: 0.9em;
		 .icon{
			 padding: 20rpx 50rpx;
			 
		 }
	}
	.item{
		display: flex;
		background-color: #fff;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		align-items: center;
		image{
			width: 80rpx;
			height: 80rpx;
		}
		.name{
			font-size: 20px;
			font-weight: bold;
			padding-left: 30rpx;
		}
	}
	}
</style>
