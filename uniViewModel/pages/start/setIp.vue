<template>
	<view>
		<u-field  placeholder="格式:127.0.0.1:8080" v-model="ip"></u-field>
		<button type="primary" style="width: 80%; margin: 30px;" @click="set">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ip:''
			};
		},
		methods:{
			set(){
				if (this.ip.length==0) {
					uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
				} else{
					uni.setStorage({
						key:'serviceIP',
						data:this.ip,
						success() {
							uni.showToast({
								title:'设置成功'
							})
						}
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
