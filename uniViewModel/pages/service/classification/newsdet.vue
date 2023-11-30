<template>
	<view>
		<view class="title">{{data.title}}</view>
		<view class="con">
		<view class="author">{{data.author}}</view>	
		<view class="time">{{data.createTime}}</view>
		</view>
		<view class="content">
			<image :src="base+data.imgUrl" mode=""></image>
			<rich-text :nodes="data.content"></rich-text>
		</view>
		<view class="revi">
			<textarea v-model="area" placeholder="请输入评论(30字)" maxlength="30" />
		</view>
		<view class="btn" @click="setcom">评论</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				data:[],
				id:null,
				area:''
			};
		},
		onLoad(e) {
			this.id=e.id
			this.getdata()
		},
		methods:{
			async getdata(){
				const res = await this.$NET({
					url:'/prod-api/api/garbage-classification/news/'+this.id
				})
				this.data=res.data
				
			},
			async setcom(){
				const res =await this.$NET({
					url:'/prod-api/api/garbage-classification/news-comment',
					method:'POST',
					data:{
						newsId:this.id,
						content:this.comment
					}
				})
				console.log(res);
				if(res.code==200){
					this.area=''
					// this.getcom()
				}else{
					this.area=''
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.title{
		font-size: 18px;
		font-weight: bold;
		text-align: center;
	}
	.con{
		display: flex;
		justify-content: flex-end;
		margin: 20rpx;
	}
	.content{
		margin: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		image{
			width: 100%;
		}
	}
	.revi{
		margin: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		text-indent: 1em;
	}
</style>
