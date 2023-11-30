<template>
	<view>
		<uni-card>
		<view class="top">
		<view class="title">评价：</view>	
		<uni-rate size="25" v-model="score"></uni-rate>
		</view>
		<view class="content">
			<textarea v-model="content" placeholder="请输入评价" />
		</view>	
		</uni-card>
		<view class="but">
			<button type="primary" @click="set">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				score:'',
				content:''
			};
		},
		onLoad(e) {
			this.id=e.id
		},
		methods:{
			async set(){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/legal-advice/evaluate',
					method:'POST',
					data:{
						id:this.id,
						evaluate:this.content,
						score:this.score
					}
				})
				console.log(this.score);
				if (res.code==200) {
					uni.showToast({
						title:'提交成功',
						icon:'success'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:`zidet?id=${this.id}`
						})
					},1000)
				} else{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.top{
		display: flex;
		padding: 20rpx;
		align-items: center;
	}
	.content{
		text-indent: 2em;
		border: 1px solid #F1F1F1;
		border-radius: 20rpx;
	}
	.but{
		margin: 20rpx;
	}
</style>
