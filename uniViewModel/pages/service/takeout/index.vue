<template>
	<view>
		<view class="pic">
			<u-swiper :list="pic" name="advImg" height="320"></u-swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:[],
				base:'http://124.93.196.45:10001'
			};
		},
		onLoad() {
			this.getpic()
		},
		methods:{
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/takeout/rotation/list'
				})
				console.log(res);
				this.pic=res.rows
				this.pic.forEach((item)=>{
					item.advImg=this.base+item.advImg
				})
			}
		}
	}
</script>

<style lang="scss">
	.pic{
		margin: 20rpx;
	}
</style>
