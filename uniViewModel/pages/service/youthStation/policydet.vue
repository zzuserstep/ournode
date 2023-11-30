<template>
	<view>
		<view class="title">{{dataarr.title}}</view>
		<view class="center">
			<view class="from">{{dataarr.author}}</view>
			<view class="time">{{dataarr.createTime}}</view>
		</view>
		<view class="content">
			<rich-text :nodes="dataarr.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataarr:[]
			};
		},
		onLoad(e) {
			this.getindex(e.id)
		},
		methods:{
			async getindex(id){
				const res = await this.$NET({
					
				url:'/prod-api/api/youth-inn/talent-policy/'+id
				})
			this.dataarr=res.data
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.title{
		font-size: 20px;
		font-weight: bold;
		text-align: center;
	}
	.center{
		display: flex;
		justify-content: space-between;
		margin: 20rpx;
	}
	.content{
		margin: 20rpx;
		padding: 20rpx;
		background-color: #fff;
	}
</style>
