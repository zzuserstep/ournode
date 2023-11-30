<template>
	<view>
		<view class="list" v-for="item in list" :key="item.id">
			<view class="item" @click="godoct(item)">
				<view class="left">
					<image :src="base+item.avatar" mode=""></image>
				</view>
				<view class="right">
					<view class="num">职业编号：{{item.practiceNo}}</view>
					<view class="name"> 姓名：{{item.name}}</view>
					<view class="content">职称：{{item.jobName}}</view>
					<view class="good">擅长：{{item.goodAt}}</view>
					<view class="work">从业：{{item.workingYears}}年</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				type:null,
				list:[]
			};
		},
		onLoad(e) {
			this.type=e.type
			this.getdoctol()
		},
		methods:{
			async getdoctol(){
				const res = await this.$NET({
					
				url:'/prod-api/api/pet-hospital/pet-doctor/list',
				data:{
					typeId:this.type
				}
				})
				this.list=res.rows
				console.log(res);
			},
			godoct(list){
				uni.navigateTo({
					url:`./wenzhen?list=${encodeURIComponent(JSON.stringify(list))}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.item{
		display: flex;
		background-color: #fff;
		border-radius: 20rpx;
		margin: 20rpx;
		padding: 20rpx;
		.left{
			image{
				width: 150rpx;
				height: 150rpx;
			}
		}
		.right{
			padding-left: 20rpx;
			
		}
	}
</style>
