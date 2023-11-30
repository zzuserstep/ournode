<template>
	<view class="start">
		<swiper :indicator-dots="true" 
		indicator-color="rgba(255,255,255,.4)"
		indicator-active-color="rgba(255,255,255,.8)"
		:autoplay="true" :interval="3000"
		:duration="500" :circular="true"
		@change="computNum" class="swiper">
			<swiper-item v-for="(item,index) in imgdata" :key="index">
				<view class="swiper-item" >
					<image :src="item.imgurl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view v-show="goindex" class="over">
			<navigator url="setIp">
				<view>IP端口设置</view>
			</navigator>
		</view>
		<view class="exprience" v-show="goindex" @click="gofirst">立即体验</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgdata:[
					{imgurl:'../../static/images/guide1.jpg'},
					{imgurl:'../../static/images/guide2.jpg'},
					{imgurl:'../../static/images/guide3.jpg'},
					{imgurl:'../../static/images/guide4.jpg'},
					{imgurl:'../../static/images/guide5.jpg'}
				],
				goindex:false
			};
		},
		methods:{
			computNum(e){
				this.goindex=e.detail.current==4?true : false
				// console.log(this.goindex);
			},
			gofirst(){
				let service=uni.getStorageSync('serviceIP');
				let token=uni.getStorageSync('token');
				if(service.length>0){
					if(token){
						uni.switchTab({
							url:'../index/index'
						})
					}else{
						uni.navigateTo({
							url:'../login/login'
						})
					}
				}else{
					uni.showToast({
						title:'请先设置IP端口',
						icon:'none',
						duration: 1000
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #000000;
	}
	.start{
		width: 100%;
		position: fixed;
		left: 0; top: 0; bottom: 0;
	}
	.swiper{
		width: 100%;
		height: 100%;
	}
	.swiper-item{
		image{
			width: 100%;
			height: 100vh;
		}
	}
	.exprience{
		color: #fff;
		border: 1px solid #fff;
		height: 60rpx;
		border-radius: 30rpx;
		padding: 10rpx 40rpx;
		right: 38%;
		bottom: 50px;	
		position: absolute;
		z-index: 99;
	}
	.over{
		position: absolute;
		z-index: 99;
		color: #007AFF;
		right: 30px;
		top: 50px;
	}
</style>
