<template>
	<view>
		<view class="top">
			<view class="pic">
				<image :src="pic" mode=""></image>
			</view>
			<navigator url="../login/login">
				<view class="tit" v-show="!show">登陆/注册</view>
			</navigator>
			<view class="tit" v-show="show">{{info.nickName}}</view>
		</view>
		<uni-list>
			<uni-list-item title="个人信息" showArrow to="perinfo"></uni-list-item>
			<uni-list-item title="订单列表" showArrow to="buylist"></uni-list-item>
			<uni-list-item title="修改密码" showArrow to="changepw"></uni-list-item>
			<uni-list-item title="信息反馈" showArrow to="setmail"></uni-list-item>
		</uni-list>
		<button type="primary" style="width: 80%; margin: 30px;" @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				info:[],
				pic:'../../static/icons/defaultAt.png',
				base:'http://124.93.196.45:10001'
			};
		},
		onLoad() {
			this.getinfo()
		},
		onShow() {
			this.getinfo()
		},
		methods:{
			getinfo(){
				uni.getStorage({
					key:'info',
					success: (res) => {
						this.info=JSON.parse(res.data)
						this.show='userName' in this.info
						if (uni.getStorageSync('avator')) {	
						this.pic=this.base+uni.getStorageSync('avator')
						} else{
							this.pic='../../static/icons/defaultAt.png'
						}
					}
				})
			},
			logout(){
				uni.showModal({
					title:'提示',
					content:'确认退出吗',
					success: (res) => {
						if(res.confirm){
							uni.removeStorageSync('info')
							uni.removeStorageSync('token')
							setTimeout(()=>{
								uni.navigateTo({
									url:'../login/login'
								})
							},500)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.top{
		width: 100%;
		height: 350rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		.pic{
			margin: 0 20rpx;
			image{
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
				
			}
			
		}
		.tit{
			font-size: 25px;
			font-weight: bold;
		}
	}
</style>
