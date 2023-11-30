<template>
	<view>
		<view class="card" v-for="item in libtlist" :key="item.id" @click="godet(item.id)">
			<view class="name">{{item.name}}</view>
			<view class="bottom">
				<view class="pic">
					<image src="../../../static/icons/postion.png" style="width: 40rpx; height: 40rpx;"></image>
					<view class="address">{{item.address}}</view>
				</view>
				<view class="state">{{item.businessState=='1'?'营业中':'休息中'}}</view>
				<view class="time">{{item.businessHours}}</view>
			</view>
		</view>
		<view class="btn" @click="add">查看更多</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				libtlist:[],
				num:1,
				com:null
			};
		},
		onLoad() {
			this.getlibrary()
		},
		methods:{
			godet(id){
				uni.navigateTo({
					url:`./libdet?id=${id}`
				})
			},
			add(){
					this.num+=1
				if(Math.ceil(this.com/10)>=this.num){
					this.getlibrary()
				}else{
					uni.showToast({
						title:'没有更多了',
						icon:'none'
					})
				}
			},
			async getlibrary(){
				const res =await this.$NET({
					url:'/prod-api/api/digital-library/library/list',
					data:{
						pageNum:this.num,
						pageSize:10
					}
				})
				res.rows.map((item)=>{
					this.libtlist.push(item)
				})
				this.com=res.total
				console.log(res);
				console.log(this.com);
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.card{
		margin: 30rpx;
		.name{
			background-color: #fff;
			padding: 20rpx;
			border-radius: 20rpx 20rpx 0 0;
			border-bottom: 2px solid #dadada;
			font-weight: bold;
		}
		.bottom{
			padding: 20rpx;
			background-color: #fff;
			border-radius: 0 0 20rpx 20rpx;
			.pic{
				display: flex;
				
			}
			.state{
				padding: 20rpx 0;
			}
			.time{
				color: #858585;
			}
		}
	}
</style>
