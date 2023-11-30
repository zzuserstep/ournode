<template>
	<view>
		<view class="top" v-for="item in piclist" :key="item.id">
			<image :src="base+item.imgUrl" mode=""></image>
		</view>
		<view class="but">
			
		<view class="btno" @click="godet(list[0])">可回收物</view>
		<view class="btnt" @click="godet(list[1])">有害垃圾</view>
		<view class="btnh" @click="godet(list[2])">湿垃圾</view>
		<view class="btnf" @click="godet(list[3])">干垃圾</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				piclist:[],
				list:['可回收垃圾','有害垃圾','厨余垃圾','其他垃圾']
			};
		},
		onLoad() {
			this.getpic()
		},
		methods:{
			godet(nu){
				uni.navigateTo({
					url:`soudet?num=${nu}`
				})
			},
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/garbage-classification/poster/list',
					data:{
						pageNum:1,
						pageSize:1
					}
				})
				
				this.piclist=res.data.slice(0,1)
				console.log(this.piclist);
			}
		}
	}
</script>

<style lang="scss">
	.top{
		margin: 20rpx;
		image{
			width: 100%;
		}
	}
	.but{
		display: flex;
		flex-wrap: wrap;
	}
	.btno{
		width: 250rpx;
		height: 250rpx;
		border-radius: 20rpx;
		background-color: #4CD964;
		color: #fff;
		font-size: 25px;
		font-weight: bold;
		line-height: 250rpx;
		text-align: center;
		margin: 50rpx;
	}
	.btnt{
		width: 250rpx;
		height: 250rpx;
		border-radius: 20rpx;
		background-color: red;
		color: #fff;
		font-size: 25px;
		font-weight: bold;
		line-height: 250rpx;
		text-align: center;
		margin: 50rpx;
	}
	.btnh{
		width: 250rpx;
		height: 250rpx;
		border-radius: 20rpx;
		background-color: #F0AD4E;
		color: #fff;
		font-size: 25px;
		font-weight: bold;
		line-height: 250rpx;
		text-align: center;
		margin: 50rpx;
	}
	.btnf{
		width: 250rpx;
		height: 250rpx;
		border-radius: 20rpx;
		background-color: #007AFF;
		color: #fff;
		font-size: 25px;
		font-weight: bold;
		line-height: 250rpx;
		text-align: center;
		margin: 50rpx;
	}
</style>
