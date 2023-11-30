<template>
	<view>
		<view class="title">{{data.title}}</view>
		<view class="time">{{data.createTime}}</view>
		<view class="content">
			<image :src="base+data.cover" mode=""></image>
			<rich-text :nodes="data.content"></rich-text>
		</view>
		
		<view class="set">
			<input type="text" v-model="comment" placeholder="请输入评论内容" />
			<view class="but" @click="setcom">评论</view>
		</view>
		<view class="showcom" v-for="item in comlist" :key="item.id">
			<view class="activ">
				<image src="../../static/icons/services/shui.png" style="width: 50rpx; height: 50rpx;"></image>
				<view class="name">{{item.userName}}</view>
			</view>
			<view class="contents">{{item.content}}</view>
			<view class="times">{{item.commentDate}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				data:[],
				comment:'',
				comlist:[],
				id:''
			};
		},
		onLoad(e) {
			this.id=e.id
			this.getdet(e.id)
			this.getcom()
		},
		methods:{
			async getdet(id){
				const res = await this.$NET({
					url:'/prod-api/press/press/'+id
				})
				this.data=res.data
			},
			async setcom(){
				const res =await this.$NET({
					url:'/prod-api/press/pressComment',
					method:'POST',
					data:{
						newsId:this.id,
						content:this.comment
					}
				})
				console.log(res);
				if(res.code==200){
					this.comment=''
					this.getcom()
				}
			},
			async getcom(){
				const res =await this.$NET({
					url:'/prod-api/press/comments/list',
					data:{
						newsId:this.id
					}
					
				})
				this.total=res.total
				this.comlist=res.rows.reverse()
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.title{
		font-weight: bold;
		text-align: center;
	}
	.time{
		display: flex;
		justify-content: flex-end;
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
	.set{
		width: 100%;
		// background-color: #fff;
		height: 100rpx;
		display: flex;
		align-items: center;
		
		.but{
			width: 120rpx;
			height: 75rpx;
			text-align: center;
			line-height: 75rpx;
			background-color:#007AFF;
			border: 1px solid #fff;
			color: #fff;
		}
		input{
			flex: auto;
			border: 1px solid #EBEEF5;
			text-indent: 1em;
			padding: 15rpx;
		}
	}
	
	.showcom{
		border-bottom: 1px solid #c9c9c9;
		margin: 20rpx;
		padding: 20rpx;
		.activ{
			display: flex;
			align-items: center;
			.name{
				font-weight: bold;
				padding-left: 10rpx;
			}
			
		}
		.contents{
			// padding-left: 30rpx;
			padding: 30rpx;
		}
		.times{
			padding-left: 20rpx;
			color: #8e8e8e;
		}
	}
</style>
