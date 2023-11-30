<template>
	<view>
		<view class="patient" v-show="patientlist.length" v-for="(item,index) in patientlist" :key="index" >
			<view class="avter" @click="goappoint(item.name)">
				<image src="../../../static/icons/defaultAt.png" mode=""></image>
			</view>
			<view class="permain">
				<view class="top">
					<text>{{item.name}}</text>
					<image src="../../../static/icons/set.png" @click="gomail(index)"></image>
				</view>
				<view class="bottom" @click="goappoint(item.name)">
					<view>手&nbsp;&nbsp;&nbsp;机：{{item.tel}}</view>
					<view>身份证：{{item.cardId}}</view>
				</view>
			</view>
		</view>
		<view class="addperson" @click="goperson">
			<image src="../../../static/icons/add.png" ></image>
			<view class="txt">添加就诊人</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api.js'
	export default {
		data() {
			return {
				patientlist:[]
			};
		},
		onLoad() {
			this.getpatient()
		},
		methods:{
			async getpatient(){
				const res = await this.$NET({
					url:api.PATIENT_LIST
				})
				this.patientlist=res.rows
			},
			goperson(){
				uni.navigateTo({
					url:`./addperson?type=${1}`
				})
			},
			gomail(m){
				uni.navigateTo({
					url:`./addperson?type=${2}&index=${m}`
				})
			},
			goappoint(e){
				uni.navigateTo({
					url:`./appointment?name=${e}`
				})
			}
		}
	}
</script>

<style lang="scss">
	
	page{
		background-color: #F8F8F8
	}
	.addperson{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 700rpx;
		height: 200rpx;
		border-radius: 30rpx;
		margin: 30rpx;
		background-color: #fff;	
		box-shadow: 2px 2px 2px #c5c5c5;
		image{
			width: 50rpx;
			height: 50rpx;	
		}
		
	}
	.patient{
		display: flex;
		width: 700rpx;
		height: 200rpx;
		border-radius: 30rpx;
		margin: 30rpx;
		background-color: #fff;	
		box-shadow: 2px 2px 2px #c5c5c5;
		.avter{
			padding:40rpx 30rpx;
			image{
				width: 120rpx;
				height: 120rpx;
				
			}
		}
		.permain{
			.top{
				display: flex;
				justify-content: space-between;
				font-size: 20px;
				padding: 20rpx 0;
				image{
					width: 40rpx;
					height: 40rpx;
				}
			}
			.bottom{
				border: 1px solid #e2e2e2;
				padding: 10rpx;
				font-size: 15px;
				color: #757575;
			}
		}
	}
</style>
