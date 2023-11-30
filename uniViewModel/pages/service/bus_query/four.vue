<template>
	<view>
		<view class="top">
		<uni-section title="步骤" type="line" padding>
				<uni-steps :options="list" :active="active" />
		</uni-section>	
		</view>
		<uni-list>
			<uni-list-item title="名字">
				<template v-slot:footer>
					<view class="right">{{all.name}}</view>
				</template>
			</uni-list-item>
			<uni-list-item title="手机">
				<template v-slot:footer>
					<view class="right">{{all.tel}}</view>
				</template>
			</uni-list-item>
			<uni-list-item title="上车地点">
				<template v-slot:footer>
					<view class="right">{{all.first}}</view>
				</template>
			</uni-list-item>
			<uni-list-item title="下车地点">
				<template v-slot:footer>
					<view class="right">{{all.end}}</view>
				</template>
			</uni-list-item>
			<uni-list-item title="日期">
				<template v-slot:footer>
					<view class="right">{{all.time}}</view>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="btn" @click="setbuy">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:'',
				active:3,
				list:[{title:'第一步'},{title:'第二步'},{title:'第三步'},{title:'第四步'}],
				all:[]
			};
		},
		onLoad() {
			uni.$on('info',(res)=>{			
				console.log('1');
				console.log(res);
				this.all=res.data
				console.log(this.all);
			})
			
		},
		methods:{
			async setbuy(){
				const res = await this.$NET({
					url:'/prod-api/api/bus/order',
					method:'POST',
					data:{
						start:this.all.first,
						end:this.all.end,
						price:this.all.price,
						path:this.all.line,
						status:1
					}
				})
				if (res.code==200) {
					uni.showToast({
						title:'提交成功',
						icon:'success'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'custom_shuttle'
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
</script>

<style lang="scss">
	.top{
		padding-top: 40px;
	}
</style>
