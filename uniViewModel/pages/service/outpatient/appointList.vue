<template>
	<view>
		<view class="detail" v-for="item in appointList" :key="item.id">
			<view class="initem">
				<view class="left">就&nbsp;&nbsp;诊&nbsp;&nbsp;号：</view>
				<view class="right">{{item.orderNo}}</view>
			</view>
			<view class="initem">
				<view class="left">就&nbsp;&nbsp;诊&nbsp;&nbsp;人：</view>
				<view class="right">{{item.patientName}}</view>
			</view>
			<view class="initem">
				<view class="left">预约科室：</view>
				<view class="right">{{item.categoryName}}</view>
			</view>			
			<view class="initem">
				<view class="left">门诊类型：</view>
				<view class="right">{{item.type==1?'专家诊':'普通诊'}}</view>
			</view>			
			<view class="initem">
				<view class="left">就&nbsp;&nbsp;诊&nbsp;&nbsp;费：</view>
				<view class="right">{{item.money}}</view>
			</view>
			<view class="initem">
				<view class="left">就诊时间：</view>
				<view class="right">{{item.reserveTime}}</view>
			</view>	
		</view>
		<view class="btn" @click="goback">返回首页</view>
	</view>
</template>

<script>
	import api from '../../../common/api.js'
	export default {
		data() {
			return {
				appointList:[]
			};
		},
		onLoad() {
			this.getAppointList()
		},
		methods:{
			async getAppointList(){
				const res = await this.$NET({
					url:api.APPOINT_LIST
				})
				console.log(res);
				this.appointList=res.rows
			},
			goback(){
				uni.navigateTo({
					url:'./hospitalList'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F8F8F8;
	}
	.detail{
		width: 680rpx;
		padding: 20rpx;
		background-color: #fff;
		margin: 30rpx;
		border-radius: 20rpx;
		.initem{
			display: flex;
			
				.left{
					color: #6e78f7;
					padding:30rpx;
					font-size: 16px;
				}
				.right{
					color: #333;
					padding:30rpx;
					font-size: 16px;
				}
			}
	}
	.btn{
		width: calc(100% - 100rpx);
		height: 80rpx;
		border-radius: 30rpx;
		background-color: #6e78f7;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
		margin-left: 50rpx;
	}
	
</style>
