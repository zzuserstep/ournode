<template>
	<view>
		<view class="showcard" v-for="item in parklist" :key="item.id">
			<view class="top">
				<view class="carnum">{{item.plateNumber}}</view>
				<view class="money">最终收费{{item.monetary}}元</view>
			</view>
			<view class="bottom">
				<view class="entry">进入时间：{{item.entryTime}}</view>
				<view class="out">出场时间：{{item.outTime}}</view>
				<view class="address">入场地址：{{item.address}}</view>
			</view>
		</view>
		<view class="click" @click="add">查看更多</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				parklist:[],
				num:1
			};
		},
		onLoad() {
			this.getParkList()
		},
		methods:{
			async getParkList(){
				const res = await this.$NET({
					url:'/prod-api/api/park/lot/record/list',
					data:{
						pageNum:this.num,
						pageSize:6
					}
				})
				console.log(res);
				res.rows.map((item)=>{
					this.parklist.push(item)
				})
				
			},
			add(){
				this.num+=1,
				this.getParkList()
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.showcard{
		background-color: #fff;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		.top{
			display: flex;
			justify-content: space-between;
			color: #ffa237;
			padding: 20rpx;
			border-bottom: 1px solid #e3e3e3;
		}
		.bottom{
			padding-top: 20rpx;
			.out{
				padding: 40rpx 0;
			}
		}
	}
	.click {
		width: 680rpx;
		height: 100rpx;
		border-radius: 30rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 40rpx;
		margin: 30rpx;
		color: #fff;
		background-color: #ffa237;
	}
</style>
