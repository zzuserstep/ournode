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
		<u-subsection :list="list" :current="index" @change="change"></u-subsection>
		<view class="info" v-if="index==0">
			<uni-section title="律师基本信息" type="line"></uni-section>
			<uni-card>
				<view class="educ">教育背景：{{lawyer.eduInfo}}</view>
				<view class="educ">从业年限：{{lawyer.workStartAt}}</view>
				<view class="educ">执业证号：{{lawyer.licenseNo}}</view>
			</uni-card>
			<uni-section title="个人简介" type="line"></uni-section>
			<uni-card>
				<view class="all">{{lawyer.baseInfo}}</view>
			</uni-card>
		</view>
		<view class="comment" v-if="index==1">
			<view class="item" v-for="item in comlist" :key="item.id">
				<uni-card>
					<view class="header">
						<image :src="base+item.fromUserAvatar" 
						style="width: 60rpx; height: 60rpx; border-radius: 50%;"></image>
						<view class="name">{{item.fromUserName}}</view>
					</view>
					<view class="content">{{item.evaluateContent}}</view>
					<view class="bot">
						<view class="time">{{item.createTime}}</view>
						<view class="like">						
						<uni-icons type="heart" size="14"/>{{item.likeCount}}
						</view>
					</view>
				</uni-card>
			</view>
			<view class="bottom">
					<view v-if="loading==1">数据加载中...</view>
					<view v-if="loading==2">没有更多了~~~</view>
			</view>
		</view>
		<view class="but">
			<button type="primary" @click="goask">免费咨询</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				lawyer:[],
				list:['服务方式','用户评价'],
				index:0,
				comlist:[],
				loading:0,
				num:1,
				total:'',
				id:null
			};
		},
		onLoad(e) {
			this.id=e.id
			this.getlawyer(e.id)
			this.getcom(e.id)
			this.getcomm(e.id)
		},
		onReachBottom() {
			this.num+=1
			if (Math.ceil(this.total/10)>this.num) {
				this.getcom(this.id)
				this.loading=1
			} else{
				this.loading=2
			}
		},
		methods:{
			change(e){
				this.index=e
			},
			goask(){
				uni.navigateTo({
					url:`./ask?id=${this.id}`
				})
			},
			async getlawyer(id){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/lawyer/'+this.id,
								
				})
				// console.log(res);
				this.lawyer=res.data
			},
			async getcom(id){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/lawyer/list-evaluate',
					data:{
						lawyerId:id,
						pageNum:this.num,
						pageSize:10
					}
				})
				// console.log(res);
				res.rows.forEach((item)=>{
					this.comlist.push(item)
				})
			},
			async getcomm(id){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/lawyer/list-evaluate',
					data:{
						lawyerId:id,
					}
				})
				console.log(res);
				this.total=res.total
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
	.info{
		padding-bottom: 100rpx;
	}
	.comment{
		padding-bottom: 100rpx;
		.item{
			.header{
				display: flex;
				align-items: center;
				.name{
					font-weight: bold;
					padding-left: 10rpx;
				}
			}
			.content{
				padding: 20rpx;
			}
			.bot{
				display: flex;
				justify-content: space-between;
			}
		}
		.bottom{
			text-align: center;
		}
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
