<template>
	<view>
		<view class="lawyer">
			<uni-card>
				<view class="item">			
				<view class="left">
					<image :src="base+lawyer.avatarUrl" mode=""></image>
				</view>
				<view class="right">
					<view class="header">
						<view class="zuo">
							<view class="name">{{lawyer.name}}</view>
							<text class="time">{{lawyer.workStartAt}}</text>
							<text class="num"style="padding-left: 10rpx;">
								咨询人数:{{lawyer.serviceTimes}}</text>
						</view>
					</view>
					<text class="shan">法律专长:{{lawyer.legalExpertiseName}}</text>
					<text class="good">好评率：{{lawyer.favorableRate}}</text>
				</view>
				
				</view>
			</uni-card>		
		</view>
		
		
			<uni-section title="问题信息" type="line"></uni-section>
			<uni-card>
				<view class="educ">问题类型：{{question.legalExpertiseName}}</view>
				<view class="educ">问题描述：{{question.content}}</view>
				<view class="educ">受理状态：{{question.state=='0'?'未受理':'已受理'}}</view>
				<view class="educ">
					<image :src="base+question.imageUrls" mode=""></image>
				</view>
				<view class="educ">电话：{{question.phone}}</view>
			</uni-card>
			
	<view class="but" v-if="question.state=='1'">
		<button type="primary" @click="goask">评价</button>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lawyer:[],
				base:'http://124.93.196.45:10001',
				laid:'',
				id:'',
				question:[]
			};
		},
		onLoad(e) {
			this.laid=e.laid
			this.id=e.id
			this.getlawyer()
			this.getques()
		},
		methods:{
			goask(){
				uni.navigateTo({
					url:`pingjia?id=${this.id}`
				})
			},
			async getlawyer(){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/lawyer/'+this.laid,
								
				})
				// console.log(res);
				this.lawyer=res.data
			},
			async getques(){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/legal-advice/'+this.id,
					
				})
				console.log(res);
				this.question=res.data
			}
		}
	}
</script>

<style lang="scss">
	.but{
		position: fixed;
		z-index: 10;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx;
		background-color: #fff;
	}
	.lawyer{
		font-size: 13px;
		
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
</style>
