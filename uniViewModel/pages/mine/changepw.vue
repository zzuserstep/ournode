<template>
	<view>
		<uni-card>
			<view style="font-size: 20px; font-weight: bold; 
			text-align: center; padding: 30rpx;">修改密码</view>
			<u-field label="旧密码" placeholder="请输入旧密码" v-model="oldpw" 
			password :error-message="err"></u-field>
			<u-field label="新密码" placeholder="请输入6位数新密码" v-model="newpw" 
			password :error-message="errs"></u-field>
		</uni-card>
		<button type="primary" style="width: 80%; margin: 30px;" @click="set">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldpw:'',
				newpw:'',
				err:'',
				errs:''
			};
		},
		methods:{
		async set(){
			if(this.oldpw.length==0 || this.newpw.length==0){
				this.err='请输入密码'
				this.errs='请输入密码'
			}else if(this.newpw.length!=6){
				this.errs='请输入6位数密码'			
			}else{
				const res = await this.$NET({
					url:'/prod-api/api/common/user/resetPwd',
					method:'PUT',
					data:{
						newPassword:this.newpw,
						oldPassword:this.oldpw
					}
				})
				console.log(res);
				if (res.code==200) {
					this.err=''
					this.errs=''
					this.oldpw=''
					this.newpw=''
					uni.showToast({
						title:'修改成功',
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
	}
</script>

<style lang="scss">

</style>
