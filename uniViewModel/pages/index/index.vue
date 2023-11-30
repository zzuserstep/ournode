<template>
	<view>
		<view class="top">
			<u-search @custom="set" @search="set" v-model="search"></u-search>
		</view>
		<view class="pic">
			<u-swiper :list="picllist" name="advImg" :effect3d="true" height="300"></u-swiper>
		</view>
		<view class="service">
			<h3>推荐服务</h3>
			<u-grid :col="5" :border="false">
				<u-grid-item v-for="item in service" :key="item.id">
					<u-icon :name="base+item.imgUrl" size="65"></u-icon>
					<text class="name">{{item.serviceName}}</text>
				</u-grid-item>
				<u-grid-item @click.native="goser">
					<u-icon :name="all" size="65"></u-icon>
					<text class="name">更多服务</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="project">
			<h3>热门主题</h3>
			<view class="items">
				<view class="mid" v-for="item in project" :key="item.id" @click="godet(item.id)">
					<image :src="base+item.cover" mode=""></image>
					<view class="u-line-2">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="news" >
			<u-sticky :enable="enable">
				<u-tabs :list="nav" name="name" :current="num" @change="change"></u-tabs>
			</u-sticky>
			<view class="newlist" v-for="item in newslist" :key="item.id" @click="godet(item.id)">
				<view class="left">
					<image :src="base+item.cover" style="width: 210rpx; height: 180rpx;"></image>
				</view>
				<view class="right">
					<view class="tit">{{item.title}}</view>
					<view class="u-line-2">
						<rich-text :nodes="item.content"></rich-text>
					</view>
					<view class="bot">
						<view class="comment">评论:{{item.commentNum}}</view>
						<view class="time">{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'',
				base:'http://124.93.196.45:10001',
				picllist:[],
				service:[],
				project:[],
				nav:[],
				newslist:[],
				num:0,
				enable:true,
				all:'../../static/images/all.png'
			};
		},
		onLoad() {
			this.getpic()
			this.getservice()
			this.getproject()
			this.getnav()
		},
		onShow() {
		        this.enable= true
		 },
		onHide() {
		    this.enable= false
		},
		methods:{
			goser(){
				uni.switchTab({
					url:'../service/service'
				})
			},
			set(){
				let show=false
				for (var i = 0; i < this.nav.length; i++) {
					if(this.nav[i].name.indexOf(this.search)>=0){
						show=true
						this.search=''
						this.num=i
						this.getnew(this.nav[i].id)
						uni.pageScrollTo({
							scrollTop:710,						
						})
						return;
					}
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
				this.getnew(this.nav[e].id)
			},
			godet(id){
				uni.navigateTo({
					url:`../news/newdet?id=${id}`
				})
			},
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/rotation/list'
				})
				this.picllist=res.rows
				this.picllist.forEach((item)=>{
					item.advImg=this.base+item.advImg
				})
			},
			async getservice(){
				const res = await this.$NET({
					url:'/prod-api/api/service/list',
					data:{
						pageNum:1,
						pageSize:9
					}
				})
				this.service=res.rows
				
			},
			async getproject(){
				const res = await this.$NET({
					url:'/prod-api/press/press/list',
					data:{
						pageNum:1,
						pageSize:4
					}
				})
				this.project=res.rows
				
			},
			async getnav(){
				const res = await this.$NET({
					url:'/prod-api/press/category/list'
				})
				this.nav=res.data
				this.getnew(res.data[0].id)
				console.log(this.nav);
			},
			async getnew(id){
				const res = await this.$NET({
					url:'/prod-api/press/press/list',
					data:{
						type:id
					}
				})
				this.newslist=res.rows
				
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f8f8f8;
	}
	.top{
		margin: 20rpx;
	}
	.service{
		h3{
			padding: 20rpx;
		}
		.name{
			font-size: 12px;
		}
	}
	.project{
		margin: 20rpx;
		h3{
			padding: 20rpx;
		}
		.items{
			display: flex;
			flex-wrap: wrap;
			.mid{
				border: 1px solid #DCDFE6;
				background-color: #fff;
				border-radius: 20rpx;
				width: 45%;
				margin: 12rpx;
				image{
					// width: 320rpx;
					width: 100%;
					height: 160rpx;
					border-radius: 20rpx 20rpx 0 0;
				}
			}
		}
	}
	.news{
		.newlist{
			margin: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 20rpx;
			display: flex;
			.right{
				padding-left: 20rpx;
				.tit{
					font-weight: bold;
				}
				.bot{
					display: flex;
					justify-content: space-between;
					color: #7f7e7e;
				}
			}
		}
	}
</style>
