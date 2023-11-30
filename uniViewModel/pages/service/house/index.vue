<template>
	<view>
		<view class="top">
			<u-search @custom="set" v-model="search"></u-search>
		</view>
		<u-tabs :list="cate" :current="num" @change="change" 
		font-size="40" gutter="50"></u-tabs>
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id" @click="godet(item.id)">
				<view class="left">
					<image :src="base+item.pic" style="width: 210rpx; height: 180rpx;"></image>
				</view>
				<view class="right">
					<view class="name">商圈：{{item.sourceName}}</view>
					<view class="name">面积：{{item.areaSize}}㎡</view>
					<view class="name">价格：{{item.price}}</view>
					<view class="u-line-2">简介：{{item.description}}</view>
				</view>
			</view>
		</view>
		<button type="primary" style="width: 80%; margin: 30px;" @click="add" v-if="total>10">查看更多</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'',
				cate:[{name:'二手'},{name:'租房'},{name:'楼盘'},{name:'中介'}],
				num:0,
				list:[],
				type:'二手',
				nm:1,
				base:'http://124.93.196.45:10001',
				total:null
			};
		},
		onLoad() {
			this.getcate()
		},
		methods:{
			set(){
				let show=false
				for (var i = 0; i < this.cate.length; i++) {
					if(this.cate[i].name.indexOf(this.search)>=0){
						show=true
						this.search=''
						this.num=i
						this.type=this.cate[i].name
						this.getcate()
					}
					return;
				}
				if(show==false){
					uni.showToast({
						title:'未找到搜索内容',
						icon:'none'
					})
				}
			},
			change(e){
				this.num=e
				this.type=this.cate[e].name
				this.getcate()
				console.log(this.cate[e].name);
			},
			godet(id){
				uni.navigateTo({
					url:`det?id=${id}`
				})
			},
			add(){
				this.nm+=1
				if (Math.ceil(this.total/10)>=this.nm) {
					this.getcate(1)
				} else{
					uni.showToast({
						title:'没有更多了',
						icon:'none'
					})
				}
			},
			async getcate(i){
				if(i!=1){
					this.list=[]
				}
				const res= await this.$NET({
					url:'/prod-api/api/house/housing/list',
					data:{
						houseType:this.type,
						pageNum:this.nm,
						pageSize:10
					}
					
				})
				res.rows.map((item)=>{
					this.list.push(item)
				})
				this.total=res.total
				console.log(this.list);
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.top{
		margin: 20rpx;
	}
	.list{
		.item{
			margin: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 20rpx;
			display: flex;
			.right{
				padding-left: 20rpx;
			}
		}
	}
</style>
