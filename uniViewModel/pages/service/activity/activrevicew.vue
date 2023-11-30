<template>
	<view>
		<view class="top">
			<input type="text" v-model="search" placeholder="请输入评论" />
			<view class="but" @click="setcom">评论</view> 
		</view>
		<view class="comlist">
			<view class="comitem" v-for="item in datareview" :key="item.id">
				<view class="name">{{item.userName}}</view>
				<view class="content">{{item.content}}</view>
				<view class="time">{{item.createTime}}</view>
			</view>
		</view>
		<!-- <view class="btn" @click="add">查看更多</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:null,
				search:'',
				datareview:[],
				num:1,
				allnum:null
			};
		},
		onLoad(e) {
			this.id=e.id
			this.getadda()
		},
		methods:{
			add(){
				this.num+=1
				if (Math.ceil(this.allnum/10)>=this.num) {
					this.getadda()
				} else{
					uni.showToast({
						title:'没有更多了',
						icon:'none'
					})
				}
			},
			async setcom(){
				const res = await this.$NET({
					url:'/prod-api/api/activity/comment',
					method:'POST',
					data:{
						activityId:this.id,
						content:this.search
						
					}
				})
				if (res.code==200) {
					// uni.navigateBack({
					// 	delta:0
					// })
					this.getadda()
					this.search=''
				} else{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			},
			async getadda(){
				const res = await this.$NET({
					url:'/prod-api/api/activity/comment/list',
					data:{
						activityId:this.id,
						
					}
				})
				console.log(res);
				this.allnum=res.total
				this.datareview=res.rows
				// res.rows.map((item)=>{
				// 	this.datareview.push(item)
				// })
				// console.log(this.datareview);
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.top{
		margin: 20rpx;
		display: flex;
		width: 100%;
		height: 100rpx;
		align-items: center;
		background-color: #fff;
		input{
			flex: auto;
			border: 1px solid #999999;
			text-indent: 1em;
			padding: 18rpx;
		}
		.but{
			width: 120rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			background-color: #c3c3c3;
		}
	}
	.comlist{
		margin: 20rpx;
		padding: 20rpx;
		.comitem{
			padding: 20rpx;
			border-bottom: 1px solid #909399;
			.name{
				font-weight: bold;
			}
			.content{
				padding: 20rpx 40rpx;
			}
			.time{
				color: #b1b1b1;
				padding: 0 40rpx;
			}
		}
	}
</style>
