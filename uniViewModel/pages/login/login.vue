<template>
	<view>
		<uni-card>
			<view style="width: 50%; margin: 0 auto;">
			<image src="../../static/images/logo.png" style="width: 100%; 
			height: 100px; padding-top: 30px;"></image>
			</view>
			<u-field label="账号" placeholder="请输入账号" v-model="user" 
			 :error-message="err"></u-field>
			<u-field label="密码" placeholder="请输入密码" v-model="pw" 
			password :error-message="errs"></u-field>
		</uni-card>
		<navigator url="./singin">		
		<view class="singin">还未注册?去注册</view>
		</navigator>
		<button type="primary" style="width: 80%; margin: 30px;" @click="set">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:'',
				pw:'',
				err:'',
				errs:''
			};
		},
		methods:{
			async set(){
				if (this.user.length==0) {
					this.err='请输入账号'
				} else if(this.pw.length==0){
					this.errs='请输入密码'				
				}else{
					const res = await this.$NET({
						url:'/prod-api/api/login',
						method:'POST',
						data:{
							username:this.user,
							password:this.pw
						}
					})
					if (res.code==200) {
						uni.setStorage({
							key:'token',
							data:res.token,
							success: (re) => {
								this.getinfo()
							}
						})
					} else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				}
			},
			async getinfo(){
				const res =await this.$NET({
					url:'/prod-api/api/common/user/getInfo'
				})
				uni.setStorage({
					key:'info',
					data:JSON.stringify(res.user),
					success: (re) => {
						uni.switchTab({
							url:'../index/index'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.singin{
		text-align: center;
		margin: 20rpx;
		color: #a5a5a5;
	}
</style>
