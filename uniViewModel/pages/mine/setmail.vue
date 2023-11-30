<template>
	<view>
		<view class="area">
			<textarea v-model="area" placeholder="请输入意见反馈" @input="comput" maxlength="150"/>
			<view class="comput">{{num}}/150</view>
		</view>
		<button type="primary" style="width: 80%; margin: 30px;" @click="set">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:0,
				area:''
			};
		},
		methods:{
			comput(e){
				this.num=e.detail.value.length
			},
			async set(){
				if (this.num==0) {
					uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
				} else{
					const res = await this.$NET({
						url:'/prod-api/api/common/feedback',
						method:'POST',
						data:{
							content:this.area
						}
					})
					if (res.code==200) {
						uni.showToast({
							title:'提交成功',
							icon:'success'
						})
						this.area=''
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
	.area{
		margin: 20rpx;
		background-color: #fafafa;
		border-radius: 20rpx;
		text-indent: 1em;
	}
	.comput{
		display: flex;
		justify-content: flex-end;
		padding: 20rpx;
	}
</style>
