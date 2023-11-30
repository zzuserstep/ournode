<template>
	<view>
		<image :src="base+data.cover" mode="widthFix"></image>

		<view class="item">
			<view class="name">{{data.name}}</view>
			<view class="sort">评分：{{data.score}}</view>
			<view class="sort">上映时间：{{data.playDate}}</view>
			<view class="sort">想看人数：{{data.likeNum}}</view>
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
					url:'/prod-api/api/movie/film/detail/'+this.id
				})
				this.data=res.data
				console.log(res);
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.item{
		margin: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		.name{
			font-size: 20px;
			font-weight: bold;
		}
		.sort{
			padding: 20rpx 0;
		}
	}
	image{
		width: 100%;
	}
</style>
