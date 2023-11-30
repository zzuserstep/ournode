<template>
	<view>
		<view class="top">			
			<view class="item">
				<view class="left">就&nbsp;&nbsp;诊&nbsp;&nbsp;人：</view>
				<view class="right">{{name}}</view>
			</view>			
			<view class="item">
				<view class="left">预约科室：</view>
				<view class="right">{{appoint.categoryName}}</view>
			</view>			
			<view class="item">
				<view class="left">门诊类型：</view>
				<view class="right">{{appoint.type==1?'专家诊':'普通诊'}}</view>
			</view>			
			<view class="item">
				<view class="left">就&nbsp;&nbsp;诊&nbsp;&nbsp;费：</view>
				<view class="right">{{appoint.money}}</view>
			</view>			
		</view>
		<view class="center">
			<uni-list>
				<uni-list-item >
					
					<view slot="header"  style="color: #6E78F7;">
						选择日期
					</view>
					<template v-slot:footer>
								<picker mode="date" :start="startDate" :value="data" :end="endDate" @change="bindDateChange">
									<view>{{data}}</view>
								</picker>
							</template>
				</uni-list-item>
				<uni-list-item >
					<view slot="header"  style="color: #6E78F7;">
						选择时间
					</view>
					<template v-slot:footer>
								<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
									<view class="uni-input">{{time}}</view>
								</picker>
							</template>
				</uni-list-item>
			</uni-list>	
		</view>
		<view class="bun">
			<view class="no" @click="back">取消</view>
			<view class="yes" @click="setappoint">确定</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api.js'
	export default {
		data() {
			return {
				appoint:{},
				name:'',
				data:this.getDate({
					format: true
					}),
				time:'10:01'	
			};
		},
		onLoad(opinion) {
			this.appoint=JSON.parse(decodeURIComponent(opinion.item)),
			this.name=opinion.name,
			console.log(this.appoint);
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
		methods:{
			getDate(type) {
			           const data = new Date();
			           let year = data.getFullYear();
			           let month = data.getMonth() + 1;
			           let day = data.getDate();
						
			           if (type === 'start') {
			               year = year - 60;
			           } else if (type === 'end') {
			               year = year + 2;
			           }
			           month = month > 9 ? month : '0' + month;
			           day = day > 9 ? day : '0' + day;
			           return `${year}-${month}-${day}`;
			       },
				    bindDateChange: function(e) {
				               this.data = e.detail.value
				     },
				    bindTimeChange: function(e) {
				               this.time = e.detail.value
				     },
					 back(){
						 uni.navigateTo({
						 	url:'./appointment'
						 })
					 },
					async setappoint(){
							const res = await this.$NET({
								url:api.CREATE_APPOINT,
								method:'POST',
								data:{
									categoryId: this.appoint.id,
									money: this.appoint.money,
									patientName: this.name,
									reserveTime: this.data+' '+this.time,
									type: this.appoint.type
								}
							})	
						 console.log(res);
						 if (res.code==200) {
								uni.showToast({
									title:'预约成功',
									icon:'success'
								})
								setTimeout(()=>{
									uni.navigateTo({
										url:'./appointList'
									})
								},1500)
						 } else{
						 	uni.showToast({
						 		title:res.msg,
						 		icon:'none'
						 	})
						 }
					 }
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.top{
		width: 680rpx;
		padding: 20rpx;
		background-color: #fff;
		margin: 20rpx;
		border-radius: 20rpx;
		.item{
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
	.center{
		width: 680rpx;
		padding: 20rpx;
		background-color: #fff;
		margin: 20rpx;
		border-radius: 20rpx;
		.left{
			
		}
	}
	.bun{
		display: flex;
		justify-content: space-between;
		margin: 30rpx;
		.no{
			width: 280rpx;
			height: 80rpx;
			color: #6e78f7;
			border: 1px solid #6e78f7;
			border-radius: 50rpx;
			text-align: center;
			line-height: 80rpx;
		}
		.yes{
			width: 280rpx;
			height: 80rpx;
			color: #fff;
			background-color:#6e78f7 ;
			border-radius: 50rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
</style>
