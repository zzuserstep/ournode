<template>
	<view>
		<view class="top">
		<uni-section title="步骤" type="line" padding>
				<uni-steps :options="list" :active="active" />
		</uni-section>	
		</view>
		<view class="center">
			
		<h3>站点信息</h3>
		<view class="byt" v-for="(item,index) in ite" :key="index">
			·{{item}}
		</view>
		</view>
		<view class="item">
			<view class="left">姓名:</view>
			<input type="text" v-model="name" placeholder="请输入"/>
		</view>
		<view class="item">
			<view class="left">手机:</view>
			<input type="text" v-model="tel" placeholder="请输入"/>
		</view>
		<view class="item">
			<view class="left">上车地:</view>
			<input type="text" v-model="first" placeholder="请输入"/>
		</view>
		<view class="item">
			<view class="left">下车地:</view>
			<input type="text" v-model="end" placeholder="请输入"/>
		</view>
		<navigator url="four">
			
		<view class="btn" @click="set">下一步</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:2,
				list:[{title:'第一步'},{title:'第二步'},{title:'第三步'},{title:'第四步'}],
				name:'',
				tel:'',
				first:'',
				end:'',
				ite:[],
				time:'',
				line:'',
				price:''
			};
		},
		onLoad() {
			uni.$on('time',(res)=>{
				console.log(res.data);
				this.ite=res.data.list.list.list
				this.price=res.data.list.list.price
				this.line=res.data.list.list.line
				this.time=res.data.time
			})
		},
		methods:{
			set(){
				setTimeout(()=>{
					uni.$emit('info',{data:{
						name:this.name,
						tel:this.tel,
						first:this.first,
						end:this.end,
						time:this.time,
						price:this.price,
						line:this.line
					}})
				},400)
			}
		}
	}
</script>

<style lang="scss">
	.top{
		padding-top: 40px;
	}
	.item{
		display: flex;
		align-items: center;
		margin: 20rpx;
		padding: 20rpx;
		.left{
			padding-right: 20rpx;
		}
	}
	.center{
		margin: 20rpx;
		padding:10rpx 30px;
	}
</style>
