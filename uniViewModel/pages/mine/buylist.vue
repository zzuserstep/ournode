<template>
	<view>
		<u-subsection :list="list" :current="index" @change="change"></u-subsection>
		<view class="left" v-if="index==0">
			<uni-card :isShadow="true" v-for="item in yibuy" :key="item.id">
				<view class="num">订单号：{{item.orderNum}}</view>
				<view class="line">订单路线：{{item.start}} -- {{item.end}}</view>
				<view class="price">票价：{{item.price}}元</view>
				<view class="time">订单日期：{{item.createTime}}</view>
			</uni-card>
			<uni-card v-if="yibuy.length==0" :isShadow="true">
				<view class="title">未有订单!</view>
			</uni-card>
		</view>
		<view class="right" v-if="index==1">
			<uni-card :isShadow="true" v-for="item in nobuy" :key="item.id">
				<view class="num">订单号：{{item.orderNum}}</view>
				<view class="line">订单路线：{{item.start}} -- {{item.end}}</view>
				<view class="price">票价：{{item.price}}元</view>
				<view class="time">订单日期：{{item.createTime}}</view>
			</uni-card>
			<uni-card v-if="nobuy.length==0" :isShadow="true">
				<view class="title">未有订单!</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:['已支付','未支付'],
				index:0,
				yibuy:[],
				nobuy:[]
			};
		},
		onLoad() {
			this.getbuy()
		},
		methods:{
			change(e){
				this.index=e
			},
			async getbuy(){
				const res = await this.$NET({
					url:'/prod-api/api/bus/order/list'
				})
				console.log(res);
				res.rows.forEach((item)=>{
					if(item.status=='1'){
						this.yibuy.push(item)
					}else{
						this.nobuy.push(item)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.title{
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		padding: 30rpx 0;
	}
</style>
