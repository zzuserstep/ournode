<template>
	<view>
		<view class="top">
		<uni-section title="步骤" type="line" padding>
				<uni-steps :options="list" :active="active" />
		</uni-section>		
		</view>
		<uni-card :isShadow="true">
			<view class="title">
				{{data.first}}-->{{data.end}}
			</view>
			<view class="bot">
				<view class="price">票价：{{data.price}}</view>
				<view class="mile">里程：{{data.mileage}}</view>
			</view>
		</uni-card>
		<navigator url="two">
		<view class="btn" @click="set">下一步</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0,
				list:[{title:'第一步'},{title:'第二步'},{title:'第三步'},{title:'第四步'}],
				id:null,
				data:[],
				lists:[]
			};
		},
		onLoad(e) {
			this.id=e.id
			this.getline()
			uni.$on('all',(res)=>{
				console.log(res.data);
				this.lists=res.data
			})
		},
		methods:{
			async getline(){
				const res = await this.$NET({
					url:'/prod-api/api/bus/line/'+this.id				
				})
				this.data=res.data
			},
			set(){
				setTimeout(()=>{
					uni.$emit('list',{data:{
						list:this.lists
					}})
					
				},300)
			}
		}
	}
</script>

<style lang="scss">
		.top{
			padding-top: 40px;
		}
		.title{
			text-align: center;
			font-size: 20px;
			font-weight: bold;
		}
		.bot{
			display: flex;
			justify-content: space-between;
			padding: 20rpx 90rpx;
		}
</style>
