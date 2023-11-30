<template>
	<view>
		<uni-list>
			<uni-list-item title="厂商类型">
				<template v-slot:footer>
					<input type="text" v-model="a1" placeholder="请输入" />
				</template>
			</uni-list-item>
			<uni-list-item title="厂商名称">
				<template v-slot:footer>
					<input type="text" v-model="a2" placeholder="请输入" />
				</template>
			</uni-list-item>
			<uni-list-item title="厂商地址">
				<template v-slot:footer>
					<input type="text" v-model="a3" placeholder="请输入" />
				</template>
			</uni-list-item>
			<uni-list-item title="厂商介绍">
				<template v-slot:footer>
					<input type="text" v-model="a4" placeholder="请输入" />
				</template>
			</uni-list-item>
			<uni-list-item title="联系电话">
				<template v-slot:footer>
					<input type="text" v-model="a5" placeholder="请输入" />
				</template>
			</uni-list-item>
		</uni-list>
		<view class="btn" @click="set">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				a1:'',
				a2:'',
				a3:'',
				a4:'',
				a5:''
			};
		},
		methods:{
			set(){
				uni.showModal({
					title:'提示',
					content:'确认提交吗',
					success: (re) => {
						if(re.confirm){
							uni.showToast({
								title:'提交成功',
								icon:'success'
							})
						}
						this.a1=''
						this.a2=''
						this.a3=''
						this.a4=''
						this.a5=''
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	input{
		text-align: right;
	}
	.btn{
		width: 680rpx;
		height: 80rpx;
		margin: 30rpx;
		border-radius: 30rpx;
		background-color: #007AFF;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
	}
</style>
