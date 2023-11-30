<template>
	<view>
		<view class="title">{{data.title}}</view>
		<view class="time">{{data.createTime}}</view>
		<view class="content">
			<image :src="base+data.imgUrl" mode=""></image>
			<rich-text :nodes="data.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				id:null,
				data:[]
			};
		},
		onLoad(e) {
			this.id=e.id
			this.getdata()
		},
		methods:{
			async getdata(){
				const res = await this.$NET({
					url:'/prod-api/api/volunteer-service/news/'+this.id
				})
				this.data=res.data
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.title{
		font-size: 15px;
		font-weight: bold;
		text-align: center;
	}
	.time{
		display: flex;
		justify-content: flex-end;
		margin: 20rpx;
	}
	.content{
		margin: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}
		image{
			width:100%
		}
</style>
