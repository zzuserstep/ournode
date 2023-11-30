<template>
	<view>
		<uni-search-bar @confirm="search" :focus="true" v-model="searchValue"  ></uni-search-bar>
		<view class="activity">
			<view class="item" v-for="item in activlist" :key="item.id">
				
				<view class="tit" @click="godet(item.id)">活动标题：{{item.tiltle}}</view>
				<view class="tit" @click="godet(item.id)">承办单位：{{item.undertaker}}</view>
				<view class="tit" @click="godet(item.id)">活动时间：{{item.startAt}}</view>
				<view class="tit" @click="godet(item.id)">人员要求：{{item.requireText}}</view>
			
				<view class="btn" @click="setname(item.id)">报名</view>
			</view>
		</view>
		<view class="loading">
			<view class="inin" v-if="loading==1">~~数据加载中</view>
			<view class="inin" v-if="loading==2">没有更多了！！</view>
		</view>
		<view class="bottom">
			<navigator url="./voluent">
				<view class="item">
					
				<image src="../../../static/a_bef.png" style="width: 80rpx; height: 80rpx;"></image>
				<view class="tit">志愿活动</view>
				</view>
			</navigator>
			<navigator url="mtyvol">
				<view class="item">
					
				<image src="../../../static/my_bef.png" style="width: 80rpx; height: 80rpx;"></image>
				<view class="tit">我的活动</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue:'',
				activlist:[],
				num:1,
				total:null,
				loading:0
			};
		},
		onLoad() {
			this.getactiv()
		},
		onReachBottom() {
			this.num+=1
			if (Math.ceil(this.total/10)>=this.num) {
				this.getactiv()
				this.loading=1
			} else{
				this.loading=2
			}
		},
		methods:{
			godet(id){
				uni.navigateTo({
					url:`./voluentdet?id=${id}`
				})
			},
			async getactiv(){
				const res = await this.$NET({
					url:'/prod-api/api/volunteer-service/activity/list',
					data:{
						pageNum:this.num,
						pageSize:10
					}
				})
				this.total=res.total
				res.rows.map((item)=>{
					
				this.activlist.push(item)
				})
			},
			async setname(ID){
				const res = await this.$NET({
					url:'/prod-api/api/volunteer-service/register',
					method:'POST',
					data:{
						activityId: ID,
						newState: true
					}
				})
				if (res.code==200) {
					uni.showToast({
						title:'报名成功',
						icon:'success'
					})
				} else{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.activity{
		.item{
			background-color: #fff;
			margin: 20rpx;
			padding: 20rpx;
			border-radius: 20rpx;
			.tit{
				padding: 10rpx 0;
			}
		}
	}
	.bottom{
		width: 100%;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		position: fixed;
		z-index: 10;
		bottom: 0;
		.item{
			padding: 0 60rpx;
			text-align: center;
		}
	}
	.loading{
		margin: 20rpx;
		padding-bottom: 120rpx;
		.inin{
			text-align: center;
			margin: 20rpx;
			color: #A5A4A4;
		}
	}
</style>
