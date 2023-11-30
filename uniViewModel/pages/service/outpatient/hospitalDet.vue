<template>
	<view>
		<view class="img">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" indicator-color="#cdcdcd" indicator-active-color="#fff">
				<swiper-item v-for="item in hosdimglist" :key="item.id">
					<view class="swiper-item">
						<image style="width: 100%;" :src="base+item.imgUrl" mode="widthFix"></image>
					</view>
				</swiper-item >	
			</swiper>
		</view>
		<view class="detail">
			<rich-text :nodes="hospitaldet"></rich-text>
		</view>
		<view class="btn" @click="goperson">预约挂号</view>
	</view>
</template>

<script>
	import api from '../../../common/api.js'
	export default {
		data() {
			return {
				base:api.BASE_URL,
				hosdimglist:[],
				hospitaldet:[]
			};
		},
		onLoad(e) {
			console.log(e);
			this.gethospitel(e.id),
			this.gethospitelimg(e.id)
		},
		methods:{
			async gethospitel(id){
				const res = await this.$NET({
					url:api.HOSPITAL_DET+id
				})
				console.log(res);
				this.hospitaldet=res.data.brief
			},
			async gethospitelimg(id){
				const res = await this.$NET({
					url:api.HOSPITAL_IMG,
					data:{
						hospitalId:id
					}
				})
				this.hosdimglist=res.data
				console.log(res);
			},
			goperson(){
				uni.navigateTo({
					url:'./personList'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f8f8f8;
	}
	.img{
		margin: 20rpx;
		padding: 20rpx;
	}
	.detail{
		margin: 20rpx;
		padding: 10rpx;
		border-radius: 10rpx;
		text-indent: 2em;
		background-color: #fff;
		box-shadow: 0 2px 2px #e4e4e4;
	}
	.btn{
		width: calc(100% - 100rpx);
		height: 80rpx;
		border-radius: 30rpx;
		background-color: #6e78f7;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
		margin-left: 50rpx;
	}
</style>
