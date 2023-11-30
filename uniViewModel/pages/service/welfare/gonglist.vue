<template>
	<view>
		<scroll-view scroll-y="true" :scroll-into-view="inid" style="max-height:100vh;">
			<view class="list-item" v-for="(item,index) in welfareList" :key="index" :id="'to'+item.id">		
				<view class="title">{{item.type}}</view>
				<view class="kitem" v-for="(kitem,kindex) in item.child" :key="kindex">
					<view class="all-item">
				<view class="left">				
				<image :src="base+kitem.imgUrl" mode=""></image>
				</view>	
				<view class="right">
					<view class="ritem">活动名称:{{kitem.name}}</view>
					<view class="ritem">活动举办者:{{kitem.author}}</view>
					<view class="ritem">已捐款数:{{kitem.moneyNow}}</view>
					<view class="ritem">所需款数:{{kitem.moneyTotal}}</view>
					<view class="ritem">捐款次数:{{kitem.donateCount}}</view>
					<view class="ritem">活动时间:{{kitem.activityAt}}</view>
				</view>			
				</view>
				
				<view class="btn" @click="godonate(kitem.id,kindex)">我要捐款</view>	
				</view>
				
			</view>
		</scroll-view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="input"   :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				welfareList:[],
				inid:null,
				base:'http://124.93.196.45:10001',
				donid:null
			};
		},
		onLoad(e) {
			this.getlist()
			setTimeout(()=>{
				this.inid='to'+e.id
			},800)
		},
		methods:{
			godonate(i){
				this.donid=i
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			async confirm(value){
				const res = await this.$NET({
					url:'/prod-api/api/public-welfare/donate-record',
					method:'POST',
					data:{
						activityId: this.donid,
						donateMoney:value
					}
				})
				console.log(res);
				if (res.code==200) {
					this.$refs.popup.close()
					uni.showToast({
						title:'捐款成功',
						icon:'success'
					})
					this.getlist()
				} else{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			},
			async getlist(){
				const res = await this.$NET({
					url:'/prod-api/api/public-welfare/public-welfare-activity/list'
					
				})
				console.log(res);
				let data=[]
				res.rows.forEach((item)=>{
					if(!data[item.type.name]){
						data[item.type.name]={
							type:item.type.name,
							id:item.typeId,
							child:[]
						}
					}
						data[item.type.name].child.push(item)
				})
				console.log(Object.values(data));
				this.welfareList=Object.values(data)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.list-item{
		.title{
			font-size: 24px;
			font-weight: bold;
			margin: 20rpx;
		}
		.kitem{
			
			margin: 15rpx;
			padding: 10rpx;
			background-color: #fff;
			border-radius: 10rpx;
			.all-item{
			   display: flex;	
			.left{
				image{
					width: 280rpx;
					height: 260rpx;
				}
			}
			.right{
				.ritem{
					padding: 5rpx 20rpx;
				}
			}
			}
			.btn{
				width: 600rpx;
				height: 60rpx;
				background-color: #F25C54;
				color: #fff;
				text-align: center;
				line-height: 60rpx;
				margin: 20rpx;
			}
		}
	}
</style>
