<template>
	<view>
		<view class="showPark" v-for="item in parkList" :key="item.id" @click="godetail(item.id)">
			<view class="top">
				<view class="name">{{item.parkName}}</view>
				<view class="distance">{{item.distance}}公里</view>
			</view>
			<view class="bottom">
				<view class="left">
					<view class="header">
						<text class="num">剩余车位{{item.priceCaps}}</text>
						<text class="money">{{item.rates}}元/小时</text>
					</view>
					<view class="address">{{item.address}}</view>
				</view>
				<view class="right">
					<image src="../../../static/icons/right.png" ></image>
				</view>	
			</view>
		</view>
		<view class="btns">
			<view class="right" @click="golist">停车记录</view>
			<view class="right" @click="add">查看更多</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				parkList:[],
				num:1
			};
		},
		onLoad() {
			this.getParkList()
		},
		methods:{
			async getParkList(){
				const res = await this.$NET({
					url:'/prod-api/api/park/lot/list',
					data:{
						pageNum:this.num,
						pageSize:6
					}
				})
				console.log(res);
				res.rows.map((item)=>{
					this.parkList.push(item)
				})
			},
			add(){	
				this.num+=1
				if(this.num>4){
					uni.showToast({
						title:'没有更多了',
						icon:'none'
					})
				}else{
					this.getParkList()
				}
			},
			golist(){
				uni.navigateTo({
					url:'./ParkList'
				})
			},
			godetail(id){
				uni.navigateTo({
					url:`./parkDetail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F2F6FC;
	}
	.showPark{
		margin: 20rpx;
		background-color: #fff;
		font-size: 17px;
		border-radius: 20rpx;
		.top{
			display: flex;
			justify-content: space-between;
			color: #007AFF;
			padding: 10rpx;
			border-bottom: 1px solid #e3e3e3;
		}
		.bottom{
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			.header{			
				.num{
					border-right: 1px solid #000000;
					padding-right: 20rpx;	
				}
				.money{
					padding-left: 20rpx;
				}
			}
			.address{
				padding-top: 30rpx;
			}
			.right{
				image{
					width: 60rpx;
					height: 60rpx;
					padding: 30rpx;
				}
			}
		}
	}
	.btns{
		display: flex;
		justify-content: space-between;
		margin: 30rpx;
		.right,.left{
			background-color: #feb60e;
			color: #fff;
			width: 240rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 50rpx;
		}
	}
</style>
