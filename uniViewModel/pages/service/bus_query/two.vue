<template>
	<view>
		<view class="top">
		<uni-section title="步骤" type="line" padding>
				<uni-steps :options="list" :active="active" />
		</uni-section>	
		</view>
		<uni-card :isShadow="true">
			<view class="title">请选择时间</view>
			<uni-datetime-picker type="date" :clear-icon="false" v-model="single" @maskClick="maskClick" />
		</uni-card>
		<navigator url="three">
			<view class="btn" @click="set">下一步</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:1,
				list:[{title:'第一步'},{title:'第二步'},{title:'第三步'},{title:'第四步'}],
				single:'',
				lists:[]
			};
		},
		onLoad(e) {
			uni.$on('list',(res)=>{
				console.log(res.data);
				this.lists=res.data
			})
		},
		methods:{
			maskClick(e){
				this.single=e
			},
			set(){
				setTimeout(()=>{
					
				uni.$emit('time',{data:{
					
					time:this.single,
					list:this.lists
				}
				})
				},100)
			}
		}
	}
</script>

<style lang="scss">
	.top{
		padding-top: 40px;
	}
	.title{
		font-size: 20px;
		font-weight: bold;
		text-align: center;
	}
</style>
