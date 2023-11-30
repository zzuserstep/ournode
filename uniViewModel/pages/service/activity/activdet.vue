<template>
	<view>
		<view class="title">{{dataarr.name}}</view>
		<view class="time">{{dataarr.createTime}}</view>
		<view class="content">
			<rich-text :nodes="dataarr.content"></rich-text>
		</view>
		<view class="btn" @click="setname" v-show="!show">我要报名</view>
		<view class="btn"  v-show="show">已报名</view>
		<view class="activlist">
			<h2>推荐活动</h2>
			<view class="items" v-for="(item,index) in activlist" :key="index" >		
					<view class="tit">{{item.name}}</view>				
					<view class="bot">
						<view class="comment">报名人数：{{item.signupNum}}</view>
						<view class="time">点赞数：{{item.likeNum}}</view>
					</view>	
			</view>
		</view>
		<view class="chat" @click="goreview(dataarr.id)">
			<view class="left">
				<uni-icons type="compose" size="30"></uni-icons>
				<text class="byte">请输入评论</text>
			</view>
			<view class="right">
				<uni-icons type="compose" size="30"></uni-icons>
				<uni-badge class="rwBadge" :text="commentNum" type="error" size="small"></uni-badge>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				dataarr:[],
				id:null,
				show:false,
				activlist:[],
				commentNum:null
			};
		},
		onLoad(e) {
			this.id=e.id,
			this.getdet(),
			this.getadd(),
			this.getactive(),
			this.getcomment()
		},
		methods:{
			goreview(id){
				uni.navigateTo({
					url:`./activrevicew?id=${id}`
				})
			},
			async setname(){
				uni.showModal({
					title:'提示',
					content:'确认参加吗',
					success: (re) => {
						if(re.confirm){
							this.get()
						}
					}
				})
			},
			async get(){
				const res = await this.$NET({
					url:'/prod-api/api/activity/signup',
					method:'POST',
					data:{
						activityId:this.id
					}
				})
				if (res.code==200) {
					uni.showToast({
						title:'报名成功',
						icon:'success'
					})
					this.getadd()
				} else{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			},
			async getadd(){
				const res = await this.$NET({
					url:'/prod-api/api/activity/signup/check',
					data:{
						activityId:this.id
					}
				})
				// console.log(res);
				this.show=res.isSignup
			},
			async getcomment(){
				const res = await this.$NET({
					url:'/prod-api/api/activity/comment/number',
					data:{
						activityId:this.id
					}
				})
				// console.log(res);
				this.commentNum=res.commentNum
			},
			async getdet(){
				const res = await this.$NET({
					url:'/prod-api/api/activity/activity/'+this.id
				})
				this.dataarr=res.data
				console.log(res);
			},
			async getactive(){
				const res = await this.$NET({
					url:'/prod-api/api/activity/activity/list',
					data:{
						pageNum:1,
						pageSize:3
					}
				})
				this.activlist=res.rows
				console.log(res);
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
		margin: 20rpx;
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
		/deep/ img{
			max-width: 100%;
		}
	}
	.activlist{
		margin: 20rpx;
		padding: 20rpx;
		padding-bottom: 120rpx;
		h2{
			padding: 15rpx;
		}
		.items{
			border-bottom: 1px solid #909399;
				.tit{
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient:vertical;
				}
				
				.bot{
					display: flex;
					padding-top: 30rpx;
					justify-content: space-between;
					color: #A5A5A5;
				}
			
		}
	}
	.chat{
		width: 100%;
		background-color: #fff;
		padding: 20rpx;
		border-top: 2px solid #d2d2d2;
		position: fixed;
		bottom: 0;
		z-index: 9;
		display: flex;
		justify-content: space-between;
		.byte{
			padding: 20rpx 30rpx;
			color: #7e7e7e;
			
		}
		.right{
			padding-right: 30rpx;
			.rwBadge{
				position: absolute;
				right: 35rpx;
				top: 5rpx;
			}
		}	
	}
</style>
