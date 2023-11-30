<template>
	<view>
		<view class="news">
			<u-sticky :enable="enable">
				<u-tabs :list="nav" name="name" :current="num" @change="change"></u-tabs>
			</u-sticky>
			<view class="newlist" v-for="item in newslist" :key="item.id" @click="godet(item.id)">
				<view class="left">
					<image :src="base+item.cover" style="width: 210rpx; height: 180rpx;"></image>
				</view>
				<view class="right">
					<view class="tit">{{item.title}}</view>
					<view class="u-line-2">
						<rich-text :nodes="item.content"></rich-text>
					</view>
					<view class="bot">
						<view class="comment">评论:{{item.commentNum}}</view>
						<view class="time">{{item.createTime}}</view>
					</view>
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
				nav:[],
				newslist:[],
				num:0,
				enable:true,
			};
		},
		onLoad() {
			this.getnav()
		},
		onShow() {
		        this.enable= true
		 },
		onHide() {
		    this.enable= false
		},
		methods:{
			godet(id){
				uni.navigateTo({
					url:`./newdet?id=${id}`
				})
			},
			change(e){
				this.num=e
				this.getnew(this.nav[e].id)
			},
			async getnav(){
				const res = await this.$NET({
					url:'/prod-api/press/category/list'
				})
				this.nav=res.data
				this.getnew(res.data[0].id)
			},
			async getnew(id){
				const res = await this.$NET({
					url:'/prod-api/press/press/list',
					data:{
						type:id
					}
				})
				this.newslist=res.rows
				
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f8f8f8;
	}
	.news{
		.newlist{
			margin: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 20rpx;
			display: flex;
			.right{
				padding-left: 20rpx;
				.tit{
					font-weight: bold;
				}
				.bot{
					display: flex;
					justify-content: space-between;
					color: #7f7e7e;
				}
			}
		}
	}
</style>
