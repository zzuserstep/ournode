<template>
	<view>
		
		<view class="top">
			<u-search @custom="set" @search="set" v-model="search"></u-search>
		</view>
		<view class="pic">
			<u-swiper :list="piclist" name="imgUrl" interval="3000" height="300rpx"></u-swiper>
		</view>
		<view class="icon">
			<h3>法律专长</h3>
		<swiper style="height: 160px;">
			<swiper-item >
				<view class="swiper-item">
					<u-grid :col="4" :border="false">
						<u-grid-item v-for="item in icono" :key="item.id" 
						@click.native="golist">
							<u-icon :name="base+item.imgUrl" size="65"></u-icon>
							<text class="name">{{item.name}}</text>
						</u-grid-item>
					</u-grid>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<u-grid :col="4" :border="false">
						<u-grid-item v-for="item in icont" :key="item.id" 
						@click.native="golist">
							<u-icon :name="base+item.imgUrl" size="65"></u-icon>
							<text class="name">{{item.name}}</text>
						</u-grid-item>
					</u-grid>
				</view>
			</swiper-item>
		</swiper>
		</view>
		<view class="myset">
			<h3>我的咨询</h3>
			<uni-card :isShadow="true">
			<navigator url="./zixunlist">
				<view class="mytit">我的咨询</view>
			</navigator>
			</uni-card>
		</view>
		
		<view class="lawyer">
		<view class="head">
			<h3>本月上榜优选律师</h3>
			<view class="more" @click="golawyer">查看更多</view>
		</view>
		<view class="list" v-for="item in lawyer" :key="item.id">
			<uni-card>
				<view class="item">
				
				<view class="left">
					<image :src="base+item.avatarUrl" mode=""></image>
				</view>
				<view class="right">
					<view class="header">
						<view class="zuo">
							<view class="name">{{item.name}}</view>
							<text class="time">{{item.workStartAt}}</text>
							<text class="num"style="padding-left: 10rpx;">咨询人数:{{item.serviceTimes}}</text>
						</view>
						<view class="you">
							<view class="but" @click="godet(item.id)">咨询</view>
						</view>
					</view>
					<text class="shan">法律专长:{{item.legalExpertiseName}}</text>
					<text class="good">好评率：{{item.favorableRate}}</text>
				</view>
				
				</view>
			</uni-card>		
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
				piclist:[],
				icono:[],
				icont:[],
				lawyer:[]
			};
		},
		onLoad() {
			this.getpic()
			this.geticon()
			this.getlawyer()
		},
		methods:{
			godet(id){
				uni.navigateTo({
					url:`lawyerdet?id=${id}`
				})
			},
			golist(){
				uni.navigateTo({
					url:'./goodat'
				})
			},
			golawyer(){
				uni.navigateTo({
					url:'lawlist'
				})
			},
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/ad-banner/list'
				})
				res.data.forEach((item)=>{
					item.imgUrl=this.base+item.imgUrl
				})
				this.piclist=res.data
			},
			async geticon(){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/legal-expertise/list'
				})
				this.icono=res.rows.slice(0,8)
				this.icont=res.rows.slice(8,16)
			},
			async getlawyer(){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/lawyer/list-top10'
				})
				console.log(res);
				this.lawyer=res.data
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.lawyer{
		font-size: 13px;
		.head{
			display: flex;
			align-items: center;
			padding:0 20rpx;
			justify-content: space-between;
		}
		.list{
			.item{
				display: flex;
				padding: 15rpx;
				.left{
					image{
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
					}
				}
				.right{
					padding-left: 20rpx;
					.header{
						display: flex;
						align-items: center;
						padding-bottom: 20rpx;
						justify-content: space-between;
						.you{
							padding-left: 40rpx;
							.but{
								color: #fff;
								background-color: #007AFF;
								padding: 15rpx;
								border-radius: 15rpx;
							}
						}
					}
					.good{
						padding-left: 20rpx;
					}
				}
			}
		}
	}
	.top{
		margin: 20rpx;
	}
	.pic{
		margin: 20rpx;
	}
	h3{
		padding: 20rpx;
	}
	.myset{
		.mytit{
			text-align: center;
			font-size: 18px;
			font-weight: bold;
			padding: 40rpx 0;
		}
	}
	
</style>
