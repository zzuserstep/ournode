<template>
	<view>
		<view class="pic">
			<image :src="base+data.imgUrl" mode="widthFix"></image>
		</view>
		<uni-card :isShadow="true" >
			<view class="title">标题：{{data.title}}</view>
			<view class="title">诉求内容：{{data.content}}</view>
			<view class="title">承办单位：{{data.undertaker}}</view>
			<view class="title">提交时间：{{data.createTime}}</view>
			<view class="title">处理状态：{{data.state==0?'未处理':'已处理'}}</view>
			<view class="title">处理结果：{{data.detailResult}}</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[],
				base:'http://124.93.196.45:10001',
				id:''
			};
		},
		onLoad(e) {
			this.id=e.id
			this.getdata()
		},
		methods:{
			async getdata(){
				const res = await this.$NET({
					url:'/prod-api/api/gov-service-hotline/appeal/'+this.id
				})
				this.data=res.data
				console.log(res);
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.pic{
		margin: 20rpx;
		image{
			width: 100%;
		}
	}
</style>
