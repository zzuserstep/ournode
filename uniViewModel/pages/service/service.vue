<template>
	<view>
		<view class="all">
			<view class="left">
				<view v-for="(item,index) in servicelist" :key="index" 
				@click="change(index)" :class="num==index?'items active':'items'">
				{{item.serviceType}}</view>
			</view>
			<view class="right">
				<scroll-view scroll-y="true" style="height:100vh;"
				:scroll-into-view="'top'+num" :scroll-with-animation="true">
				<view class="right-item" v-for="(item,index) in servicelist" :key="index" 
				:id="'top'+index">
					<view class="title">{{item.serviceType}}</view>
					<view class="child">
						<u-grid :col="3" :border="false">
							<u-grid-item v-for="(kitem,kindex) in item.child" :key="kindex"
							@click.native="godet(kitem)">
								<u-icon :name="base+kitem.imgUrl" size="75"></u-icon>
								<view class="name">{{kitem.serviceName}}</view>
							</u-grid-item>
						</u-grid>
					</view>
					<u-line :hair-line="false" margin="20rpx"></u-line>
				</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				servicelist:[],
				base:'http://124.93.196.45:10001',
				num:0
			};
		},
		onLoad() {
			this.getservice()
		},
		methods:{
			godet(e){
				console.log(e.link);
				uni.navigateTo({
					
					url:e.link
					
				})
			},
			change(E){
				this.num=E
			},
			async getservice(){
				const res = await this.$NET({
					url:'/prod-api/api/service/list'
				})
				let all=[]
				res.rows.forEach((item)=>{
					if(!all[item.serviceType]){
						all[item.serviceType]={
							serviceType:item.serviceType,
							child:[]
						}					
					}
					all[item.serviceType].child.push(item)
				})
				this.servicelist=Object.values(all)
				console.log(this.servicelist);
			}
		}
	}
</script>

<style lang="scss">
	.all{
		display: flex;
			position: fixed;
			top:var(--window-top);
			left: 0;		
			bottom: 0;
			height:100vh;
		.left{
			white-space: nowrap;
			background-color: #F8F8F8;
			.items{
					background-color: #f3f3f3;
					padding: 20rpx 40rpx;
				&.active{
				background-color: #fff;
				font-weight: bold;
				}
			}
		}
		.right{
			.title{
				font-size: 19px;
				padding: 20rpx;
			}
		}
	}
</style>
