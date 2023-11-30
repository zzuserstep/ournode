<template>
	<view>
		<view class="all" v-if="total>0" v-for="item in data" :key="item.id" @click="godet(item.id)">
			<view class="item">
				<view class="left">违章时间：</view>
				<view class="right">{{item.badTime}}</view>
			</view>
			<view class="item">
				<view class="left">违章地点：</view>
				<view class="right">{{item.illegalSites}}</view>
			</view>
			<view class="item">
				<view class="left">违章记分：</view>
				<view class="right">{{item.deductMarks}}</view>
			</view>
			<view class="item">
				<view class="left">罚款金额：</view>
				<view class="right">{{item.money}}</view>
			</view>
			<view class="item">
				<view class="left">处理状态：</view>
				<view class="right">{{item.disposeState}}</view>
			</view>
		</view>
		<view class="noall" v-if="total==0">没有违章记录</view>
		<view class="btn" v-if="total>5" @click="add">查看更多</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				card:'',
				dongnum:'',
				data:[],
				num:1,
				total:null,
				n:''
			};
		},
		onLoad() {
			uni.$on('datacar',(res)=>{
				console.log(res.data);
				this.dongnum=res.data.fadong,
				this.card=res.data.num
			})
			this.getfail()
		},
		methods:{
			godet(id){
				uni.navigateTo({
					url:`./tradet?id=${id}`
				})
			},
			add(){
				this.num+=1
				if (Math.ceil(this.total/5)>=this.num) {
					this.getfail()
				} else{
					uni.showToast({
						title:'没有更多了',
						icon:'none'
					})
				}
			},
			async getfail(){
				const res = await this.$LINE({
					url:'/prod-api/api/traffic/illegal/list',
					data:{
						pageNum:this.num,
						pageSize:5,
						engineNumber:this.dongnum,
						licencePlate:this.card
					}
				})
				// console.log(res);
				this.total=res.total
				res.rows.map((item)=>{
					this.data.push(item)
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.all{
		margin: 20rpx;

			background-color: #fff;
		.item{
			margin: 20rpx;
			padding: 20rpx;
			border-radius: 20rpx;
			display: flex;
			.left{
				white-space: nowrap;
				padding-right: 20rpx;
			}
		}
	}
	.noall{
		margin: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		text-align: center;
		line-height: 180rpx;
		height: 180rpx;
	}
</style>
