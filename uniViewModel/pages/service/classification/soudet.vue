<template>
	<view class="dat" >
		<view class="all"v-for="item in data" :key="item.id">
			
		
		<view class="top">
			<image :src="base+item.imgUrl" mode=""></image>
		</view>
		<view class="det">
		<view class="tilte">{{item.name}}</view>
		<view class="introe">{{item.introduce}}</view>	
		<h3>分类要求</h3>
		<view class="git">{{item.guide}}</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				base:'http://124.93.196.45:10001',
				data:[]
			};
		},
		onLoad(e) {
			this.name=e.num
			this.getdata()
		},
		methods:{
			async getdata(){
				const res =await this.$NET({
					
				url:'/prod-api/api/garbage-classification/garbage-classification/list',
				data:{
					Name:this.name
				}
				})
				console.log(res);
				this.data=res.rows
				console.log(this.data);
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.top{
		margin: 20rpx;
		image{
			width: 100%;
		}
	}
	.det{
		margin: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		.title{
			font-size: 20px;
			font-weight: bold;
		}
	}
</style>
