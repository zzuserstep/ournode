<template>
	<view>
		<uni-card>
			<view style="width: 50%; margin: 0 auto;">
			<image src="../../static/images/logo.png" style="width: 100%; 
			height: 100px; padding-top: 30px;"></image>
			</view>
			<u-field label="昵称" placeholder="请输入昵称" v-model="nick"
			 :error-message="erro"></u-field>
			<u-field label="账号" placeholder="请输入账号" v-model="user" 
			 :error-message="errt"></u-field>
			<u-field label="密码" placeholder="请输入密码" v-model="pw" 
			password :error-message="errs"></u-field>
			<u-field label="手机" placeholder="请输入手机号" v-model="tel"
			 :error-message="errf"></u-field>
		</uni-card>
		<button type="primary" style="width: 80%; margin: 30px;" @click="set">注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nick:'',
				user:'',
				pw:'',
				tel:'',
				erro:'',
				errt:'',
				errs:'',
				errf:''
			};
		},
		methods:{
			async set(){
				if(this.nick.length==0 || this.user.length==0){
					this.erro='请输入内容'
					this.errt='请输入内容'
				}else if(this.pw.length!=6){
					this.errs='请输入6位数密码'
				}else if(this.tel.length!=11){
					this.errf='请输入11位手机号'
				}else{
					const res =await this.$NET({
						url:'/prod-api/api/register',
						method:'POST',
						data:{
							userName:this.user,
							nickName:this.nick,
							password:this.pw,
							phonenumber:this.tel,
							sex:'0'
						}
					})
					if (res.code==200) {
						uni.showToast({
							title:'注册成功',
							icon:'success'
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'./login'
							})
						},1600)
					} else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
