<template>
	<view>
		<view class="jobdet">
			<view class="jobtitle">工作详情</view>
			<view class="detail">	
				<view class="itemRow">
					<view class="label">职位名称：</view>
					<view class="text">{{jobarr.name}}</view>
				</view>
				<view class="itemRow">
					<view class="label">职位要求：</view>
					<view class="text">{{jobarr.need}}</view>
				</view>
				<view class="itemRow">
					<view class="label">工作地址：</view>
					<view class="text">{{jobarr.address}}</view>
				</view>
				<view class="itemRow">
					<view class="label">薪&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;酬：</view>
					<view class="text">{{jobarr.salary}}</view>
				</view>
				<view class="itemRow">
					<view class="label">联&nbsp;&nbsp;系&nbsp;&nbsp;人：</view>
					<view class="text">{{jobarr.contacts}}</view>
				</view>
				<view class="itemRow">
					<view class="label">工作描述：</view>
					<view class="text">{{jobarr.obligation}}</view>
				</view>
			</view>
		</view>		
		<view class="compdet">
			<view class="comptitle">公司详情</view>
			<view class="detail">
				<view class="itemRow">
					<view class="label">公司名称：</view>
					<view class="text">{{company.companyName}}</view>
				</view>
				<view class="itemRow">
					<view class="label">公司简介：</view>
					<view class="text">{{company.introductory}}</view>
				</view>
			</view>
		</view>
		<view class="bot">
			 <view class="click" @click="resume">投递简历</view>
		</view>
		
	</view>
</template>

<script>
	import api from '../../../common/api.js'
	export default {
		data() {
			return {
				jobarr:[],
				company:[]
			}
		},
		onLoad(e) {
			console.log(e);
			this.getJobdet(e.id);
			this.getcomdet(e.comid)
		},
		methods: {
			async getJobdet(id){
				const res = await this.$NET({
					url:api.JOBDET_URL+id,
				})
				// console.log(res);
				this.jobarr=res.data
				
			},
			async getcomdet(id){
					const res = await this.$NET({
						url:api.COMPANY_DET+id,
					})
					// console.log(res);
					this.company=res.data
					
				},
				async resume(){
					const res = await this.$NET({
						url:api.JOB_DELIVER,
						method:'POST',
						data:{
							companyId:this.jobarr.companyId, 
							money: this.jobarr.salary,
							postId: this.jobarr.id,
							postName:this.jobarr.name 
						}
					})
					// console.log(res);
					if(res.code == 200) {
						uni.showToast({
							icon: 'success',
							title: res.msg
						});
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				}
			
		}
		
	}
</script>

<style lang="scss">
	.jobtitle{
		background-color:#A8B3C4;
		color: #fff;
		padding: 20rpx;
	}
	.detail{
		padding: 20rpx;
	}
	.itemRow{
		display: flex;
		font-size: 16px;
		line-height: 24px;	
		.label{
			white-space: nowrap;
		}
		.text{	
			text-align: left;
		}
	}
	.comptitle{
		background-color:#A8B3C4;
		color: #fff;
		padding: 20rpx;
	}
	.bot{
		position: fixed;
		left: 60rpx;
		bottom: 0;
		z-index: 9;
	}
	.click {
		width: 580rpx;
		height: 100rpx;
		border-radius: 30rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 45rpx;
		margin: 30rpx;
		color: #fff;
		background-color: #2F80ED;
	}
</style>
