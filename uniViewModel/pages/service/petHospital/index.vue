<template>
	<view>
		<view class="animal">
			<view class="title">宠物种类</view>
			<view class="item">
			<uni-grid :column="5" :show-border="false" :square="true">
				<uni-grid-item v-for="(item,index) in animallist" @click.native="godotcor(item.id)" >
					<image :src="base+item.imgUrl" style="width: 60rpx ; height: 60rpx;" class="icon"></image>
					<view class="txt">{{item.name}}</view>
				</uni-grid-item>
			</uni-grid>
			</view>
		</view>
		<view class="mylist">
			<view class="title">我的问诊</view>
			<view class="list" v-for="item in mylistarr" :key="item.id" v-show="show" @click="goanli(item,'1')">
				<view class="item">
					<view class="left">
						<image :src="base+item.doctor.avatar" mode=""></image>
					</view>
					<view class="right">
						<view class="name"> 名字：{{item.doctor.name}}</view>
						<view class="content">案例描述：{{item.question}}</view>
					</view>
				</view>
			</view>
			<view class="noshow" v-show="!show">还未有问诊!</view>
		</view>
		<view class="allshow">
			<view class="title">问诊案例</view>
			<view class="list" v-for="item in listarr" :key="item.id" @click="goanli(item)">
				<view class="item">
					<view class="left">
						<image :src="base+item.doctor.avatar" mode=""></image>
					</view>
					<view class="right">
						<view class="name"> 名字：{{item.doctor.name}}</view>
						<view class="content">案例描述：{{item.question}}</view>
					</view>
				</view>
			</view>
			<view class="btn" @click="add">查看更多</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				animallist:[],
				listarr:[],
				num:1,
				mylistarr:[],
				show:false
			};
		},
		onLoad() {
			this.getanimal(),
			this.getlist(),
			this.getmy()
		},
		methods:{
			goanli(item,num){
				if (num=='1') {
					uni.navigateTo({
						url:`./anli?list=${encodeURIComponent(JSON.stringify(item))}&num=${num}`
					})
				} else{
					uni.navigateTo({
						url:`./anli?list=${encodeURIComponent(JSON.stringify(item))}`
					})
				}
				
			},
			add(){
				this.num+=1
				this.getlist()
			},
			godotcor(id){
				uni.navigateTo({
					url:`./setdoctor?type=${id}`
				})
			},
			async getanimal(){
				const res = await this.$NET({
					url:'/prod-api/api/pet-hospital/pet-type/list'
				})
				this.animallist=res.data
			},
			async getlist(){
				const res = await this.$NET({
					url:'/prod-api/api/pet-hospital/inquiry/list',
					data:{
						pageNum:this.num,
						pageSize:10
					}
				})
				res.rows.forEach((item)=>{
					if(item.doctor!=null){
						this.listarr.push(item)
					}
				})
				// res.rows.map((item)=>{
					// this.listarr.push(item)
				// })
				console.log(this.listarr);
			},
			async getmy(){
				const res = await this.$NET({
					url:'/prod-api/api/pet-hospital/inquiry/my-list',
				})
							
					
				res.rows.map((item)=>{
										
					this.mylistarr.push(item)
					
				})
				console.log(res);
				this.show=this.mylistarr.length>0?true:false
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.animal{
		.title{
			font-size: 16px;
			font-weight: bold;
			margin: 20rpx;
		}
		.item{
			margin: 15rpx;
			background-color: #fff;
			border-radius: 20rpx;
			text-align: center;
			image{
				padding: 20rpx 50rpx;
			}
		}
	}
	.allshow,.mylist{
		.title{
			font-size: 16px;
			font-weight: bold;
			margin: 20rpx;
		}
		.item{
			display: flex;
			background-color: #fff;
			border-radius: 20rpx;
			margin: 20rpx;
			padding: 20rpx;
			.left{
				image{
					width: 150rpx;
					height: 120rpx;
				}
			}
			.right{
				padding-left: 20rpx;
				.name{
					padding: 20rpx 0;
				}
				.content{
						word-break:break-all;
						word-wrap:break-word;
				}
			}
		}
	}
	.noshow{
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		margin: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 20rpx;
	}
</style>
