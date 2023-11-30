<template>
	<view>
		<view class="item" v-for="(item,index) in list" :key="item.id" >
			<view class="time" @click="goline(item.id,index)">路线名称：{{item.name}}</view>
			<view class="time" @click="goline(item.id,index)">起点：{{item.first}}</view>
			<view class="time" @click="goline(item.id,index)">终点：{{item.end}}</view>
			<view class="time" @click="goline(item.id,index)">
				运行时间：{{item.startTime}}--{{item.endTime}}</view>
			<view class="time" @click="goline(item.id,index)">票价：{{item.price}}</view>
			<view class="time" @click="goline(item.id,index)">里程：{{item.mileage}}公里</view>
			<uni-collapse>
				<uni-collapse-item title="站点信息">
					<view v-for="it in cetlsit[index].name">{{it}}</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				cetlsit:[]
			};
		},
		onLoad() {
			this.getdtit()
			// this.getlist()
		},
		onShow() {
		},
		methods:{
			goline(e,i){
				uni.navigateTo({
					url:`./one?id=${e}`
				})
				setTimeout(()=>{
					uni.$emit('all',{data:{
						list:this.cetlsit[i].name,
						line:this.list[i].name,
						price:this.list[i].price
					}})
					
				},300)
			},
			change(e){
				console.log(e);
			},
			async getdtit(){
				const res = await this.$NET({
					url:'/prod-api/api/bus/stop/list'
				})
				let all=[]
				res.rows.forEach((item)=>{
					if(!all[item.linesId]){
						all[item.linesId]={
							name:[]
						}
					}
					all[item.linesId].name.push(item.name)
				})
				this.cetlsit=Object.values(all)
				// console.log(this.cetlsit[0].name);
				this.getlist()
			},
			async getlist(){
				const res = await this.$NET({
					url:'/prod-api/api/bus/line/list'
				})
				this.list=res.rows
				// console.log(res);
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.item{
		background-color: #fff;
		border-radius: 20rpx;
		margin: 20rpx;
		padding: 20rpx;
		.time{
			padding: 10rpx 0;
		}
	}
</style>
