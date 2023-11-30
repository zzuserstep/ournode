<template>
	<view>
		<view class="pic">
			<u-swiper :list="piclist" name="imgUrl" :effect3d="true" height="300rpx"></u-swiper>
		</view>
		<view class="icon">
			<h3>诉求分类</h3>
			<swiper style="height: 150px;">
				<swiper-item>
					<view class="swiper-item">
						<u-grid :col="4" :border="false">
							<u-grid-item v-for="item in icono" :key="item.id" 
							@click.native="golist(item.id)">
								<u-icon :name="base+item.imgUrl" size="65"></u-icon>
								<text class="name">{{item.name}}</text>
							</u-grid-item>
						</u-grid>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<u-grid :col="4" :border="false">
							<u-grid-item v-for="item in icont" :key="item.id" 
							@click.native="golist(item.id)">
								<u-icon :name="base+item.imgUrl" size="65"></u-icon>
								<text class="name">{{item.name}}</text>
							</u-grid-item>
						</u-grid>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="mine">
			<h3>我的诉求</h3>
			<view class="no" v-if="mylist.length==0">
			<uni-card>
				<view class="mytit">还未有诉求</view>
			</uni-card>
				
			</view>
			<uni-card v-for="item in mylist" :key="item.id" @click="godet(item.id)">
				<view class="title">标题：{{item.title}}</view>
				<view class="title">承办单位：{{item.undertaker}}</view>
				<view class="title">提交时间：{{item.createTime}}</view>
				<view class="title">处理状态：{{item.state==0?'未处理':'已处理'}}</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				piclist:[],
				icono:[],
				icont:[],
				mylist:[]
			};
		},
		onLoad() {
			this.getpic()
			this.geticon()
			this.getmy()
		},
		onShow() {
			this.getmy()
		},
		methods:{
			godet(id){
				uni.navigateTo({
					url:`det?id=${id}`
				})
			},
			golist(id){
				if (id=='23') {
					uni.navigateTo({
						url:`./newhot?id=${id}`
					})
				} else{
					
				uni.navigateTo({
					url:`./sulist?id=${id}`
				})
				}
			},
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/gov-service-hotline/ad-banner/list'
				})
				this.piclist=res.data
				this.piclist.forEach((item)=>{
					item.imgUrl=this.base+item.imgUrl
				})
				console.log(res);
			},
			async geticon(){
				const res = await this.$NET({
					url:'/prod-api/api/gov-service-hotline/appeal-category/list'
				})
				this.icono=res.rows.slice(0,8)
				this.icont=res.rows.slice(8,16)
			},
			async getmy(){
				const res = await this.$NET({
					url:'/prod-api/api/gov-service-hotline/appeal/my-list'
				})
				this.mylist=res.rows
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.pic{
		margin: 20rpx;
	}
	.icon{
		h3{
			padding: 20rpx;
		}
	}
	.mine{
		h3{
			margin: 20rpx;
		}
		.no{
			.mytit{
				text-align: center;
				font-size: 18px;
				font-weight: bold;
				padding: 40rpx 0;
			}
		}
	}
</style>
