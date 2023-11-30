<template>
	<view>
		<view class="jobopin">
			<view :class="tabindex==0?'tabitem active':'tabitem'" @click="getindex(0)">找工作</view>
			<view :class="tabindex==1?'tabitem active':'tabitem'" @click="getindex(1)">投递记录</view>
			<view :class="tabindex==2?'tabitem active':'tabitem'" @click="getindex(2)">个人简历</view>
		</view>

		<view class="swipershow">
			<swiper @change="swiperChange" :current="tabindex" class="jobSwiper">
				<swiper-item>
					<scroll-view scroll-y="true" class="scrollView">
					<view class="search">
						<uni-search-bar placeholder="搜索" @confirm="search"></uni-search-bar>
					</view>
					<view class="jobarr">
						<view class="title">热门职位</view>
						<view class="arr">
							<scroll-view scroll-x="true" class="nav" :scroll-into-view="'po'+clickid">
								<view v-for="(item,index) in joblist" :key="item.id"
									:class="jobindex==index?'item active':'item'" @click="changecol(index,item.id)"
									:id="'po'+index">{{item.professionName}}</view>
							</scroll-view>
						</view>
					</view>
					<view class="joblist">
						<view class="name">职位列表</view>
						<view class="detail" v-for="(item,index) in jobpost" :key="item.id"
							@click="gocomjob(item.id,item.companyId)">
							<view class="itemRow">
								<view class="label">职位名称：</view>
								<view class="text">{{item.professionName}}</view>
							</view>
							<view class="itemRow">
								<view class="label">职位描述：</view>
								<view class="text">{{item.obligation}}</view>
							</view>
							<view class="itemRow">
								<view class="label">单位地址：</view>
								<view class="text">{{item.address}}</view>
							</view>
							<view class="itemRow">
								<view class="label">薪&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;酬：</view>
								<view class="text">{{item.salary}}</view>
							</view>
						</view>
					</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" class="scrollView">
						<view class="workhistory">
							<view class="detail" v-for="(item,index) in workhistory" :key="item.id">
								<view class="itemRow">
									<view class="label">职位名称：</view>
									<view class="text">{{item.postName}}</view>
								</view>
								<view class="itemRow">
									<view class="label">公司名称：</view>
									<view class="text">{{item.companyName}}</view>
								</view>
								<view class="itemRow">
									<view class="label">薪&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;酬：</view>
									<view class="text">{{item.money}}</view>
								</view>
							</view>
						</view>						
						</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" class="scrollView">
						<view class="pic">
							<image src="../../../static/images/R-C.jpg" mode="widthFix" ></image>
						</view>
						 <view class="infoshow">
						 	<view class="iteminfo">
						 		<view >呢称：</view>
						 		<view >{{userinfo.nickName}}</view>
						 	</view>
							<view class="iteminfo">
								<view >电话：</view>
								<view >{{userinfo.phonenumber}}</view>
							</view>
							<view class="iteminfo">
								<view >性别：</view>
								<view >{{userinfo.sex=='0'?'男':'女'}}</view>
							</view>
							<view class="iteminfo">
								<view >email：</view>
								<view >{{userinfo.email}}</view>
							</view>
						 </view>
						 <navigator url="./Resume">
							  <view class="click" >个人简历管理</view>
						 </navigator>
						
						</scroll-view>
				</swiper-item>
			</swiper>

		</view>

	</view>
</template>

<script>
	import api from '../../../common/api.js'
	export default {
		data() {
			return {
				tabindex: 0,
				joblist: [],
				jobindex: null,
				clickid: '',
				jobpost: [],
				userinfo:[],
				workhistory:[]
			}
		},
		onLoad() {
			this.getjob(),
			this.getjobpost()
			// this.getDeliverHistory()
			
		},
		methods: {
			swiperChange(e){
				this.tabtap(e.detail.current);
				this.tabindex=e.detail.current
			},
			tabtap(index){
				if(index == 1) {
					this.getDeliverHistory();
				} else if(index == 2) {
					this.getUserInfo();
				}
			},
			getindex(e) {
				this.tabindex = e
			},
			changecol(e, id) {
				this.jobindex = e,
					this.clickid = e - 1,
					this.getjobpost(id)
			},
			gocomjob(e, m) {
				uni.navigateTo({
					url: `./JobDet?id=${e}&comid=${m}`
				})
			},
			async getDeliverHistory(){
				let userId = JSON.parse(uni.getStorageSync('info')).userId;
				const res = await this.$NET({
					url:'/prod-api/api/job/deliver/list',
					data:{
						userId: userId
					}
				})
				console.log(res);
				this.workhistory=res.rows
			},
			async getUserInfo(){
				const res =await this.$NET({
					url:api.INFO_URL
				})
				this.userinfo=res.user
				console.log(res);
			},
			async getjob() {
				const res = await this.$NET({
					url: api.JOB_LIST
				})
				console.log(res);
				this.joblist = res.rows
			},
			async getjobpost(id) {
				const res = await this.$NET({
					url: api.JOBPOST_LIST,
					data: {
						professionId: id
					}
				})
				// console.log(res);
				this.jobpost = res.rows
			}
		}
	}
</script>

<style lang="scss">
	.jobopin {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		// height: 80rpx;
		background-color: #f9f9f9;
		box-shadow: 2rpx 2rpx 2rpx #f3f3f3;
		position: fixed;
		top: var(--window-top);
		left: 0;
		z-index: 10;

		.tabitem {
			padding: 25rpx;

			&.active {
				color: #5231bc;
				border-bottom: 2px solid #5231bc;
			}
		}
	}

	.search {
		padding-top: 90rpx;
	}

	.title {
		background-color: #007AFF;
		color: #fff;
		font-size: 18px;
		padding: 10rpx;
	}

	.nav {
		height: 100rpx;
		padding: 0 20rpx;
		white-space: nowrap;
		// position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		left: 0;

		.item {
			display: inline-block;
			padding: 20rpx;
			border-right: 1px solid #e4e4e4;

			&.active {
				color: #007AFF;
			}
		}
	}
	.jobSwiper{
		height: calc(100vh - 100rpx);
		.scrollView{
			height: calc(100vh - 100rpx);
		}
	}
	.pic{
		padding-top: 80rpx;
		padding-left: 60rpx;
		image{	
			clip-path: circle(25%);
		}
		
	}
	.infoshow{
		// padding-top: 100rpx;	
		.iteminfo{
			text-align: center;
			display: flex;
			margin-left: 40%;
			
		}
		
	}
	.name {
		background-color: #007AFF;
		color: #fff;
		font-size: 18px;
		padding: 10rpx;
	}
	.workhistory{
		padding-top: 100rpx;
	}
	.detail {
		border-bottom: 1px solid #d5d5d5;
		margin: 20rpx;
		padding: 10rpx;
		// padding-top: 100rpx;
		.itemRow {
			display: flex;
			font-size: 16px;
			line-height: 24px;
			text-align: center;
			.label {
				white-space: nowrap;
				
			}

			.text {
				text-align: left;
			}
		}
	}
	.click {
		width: 680rpx;
		height: 100rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 45rpx;
		margin: 30rpx;
		color: #fff;
		background-color: #2F80ED;
	}
	
</style>
