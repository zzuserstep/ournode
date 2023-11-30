<template>
	<view>
		<view class="top">
			<view class="a">
				<picker mode="selector" :range="paixu" @change="change">
					<view>{{paixu[index]}}</view>
				</picker>
			</view>
			<view class="b" @click="set">筛选</view>
			<view class="show" >
			<uni-transition :mode-class="fade" :show="show" >
				<u-grid :col="4" :border="false">
					<u-grid-item v-for="item in icon" :key="item.id" 
					@click.native="reget(item.id)">
						<u-icon :name="base+item.imgUrl" size="65"></u-icon>
						<text class="name">{{item.name}}</text>
					</u-grid-item>
					<view class="all" @click="set">取消</view>
				</u-grid>		
			</uni-transition>
			</view>
		</view>
		<view class="lawyer">
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
							<text class="num" style="padding-left:30rpx;">
								咨询人数:{{item.serviceTimes}}</text>
						</view>
						<view class="you">
							<view class="but" @click="godet(item.id)">咨询</view>
						</view>
					</view>
					<text class="shan">法律专长:{{item.legalExpertiseName}}</text>
					<text class="good">服务次数：{{item.serviceTimes}}</text>
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
				paixu:[
					'默认排序','从业年限','服务人数','好评率'
				],
				index:0,
				lawyer:[],
				icon:[],
				show:false,
				fade:'slide-bottom'
			};
		},
		onLoad() {
			this.getlawyer()
			this.geticon()
		},
		methods:{
			godet(id){
				uni.navigateTo({
					url:`lawyerdet?id=${id}`
				})
			},
			set(){
				this.show=!this.show
			},
			reget(e){
				this.show=!this.show
				console.log(e);
				this.getlaw(e)
			},
			change(e){
				this.index=e.detail.value
				if (this.index==1) {
					this.getlawyer('workStartAt')
				} else if(this.index==2){
					this.getlawyer('serviceTimes')
				}else if(this.index==3){
					this.getlawyer('favorableRate')
				}else{
					this.getlawyer()
				} 
			},
			async geticon(){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/legal-expertise/list'
				})
				this.icon=res.rows
			},
			async getlaw(id){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/lawyer/list',
					data:{
						legalExpertiseId:id
					}				
				})
				// console.log(res);
				this.lawyer=res.rows
			},
			async getlawyer(id){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/lawyer/list',
					data:{
						sort:id
					}				
				})
				// console.log(res);
				this.lawyer=res.rows
			}
		}
	}
</script>

<style lang="scss">
	.top{
		display: flex;
		padding: 10px 0;
		justify-content: space-around;
		font-size: 16px;
		border-bottom: 1px solid #eee;
	}
	.show{
		width: 100%;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		padding:10rpx;
		.all{
			width: 100%;
			text-align: center;
			padding: 10rpx;
			border: 1px solid #EBEEF5;
			border-radius: 20rpx;
		}
	}
	.lawyer{
		font-size: 13px;
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
</style>
