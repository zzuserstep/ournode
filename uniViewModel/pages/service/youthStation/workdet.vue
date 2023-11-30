<template>
	<view>
		<view class="top">
			<image :src="base+talentarr.imgUrl" mode=""></image>
			<view class="txt">
				{{talentarr.introduce}}
			</view>
		</view>
		<view class="policy">
			<h3>人才政策</h3>
			<view class="item" v-for="item in policylist" :key="item.id" @click="gopolicydet(item.id)">
				<view class="title">{{item.title}}</view>
				<view class="time">{{item.createTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				talentarr:[],
				policylist:[]
			};
		},
		onLoad(e) {
			this.gettalent(e.id),
			this.getpolicy(e.id)
		},
		methods:{
			gopolicydet(id){
				uni.navigateTo({
					url:`./policydet?id=${id}`
				})
			},
			async gettalent(id){
				const res = await this.$NET({
					url:'/prod-api/api/youth-inn/talent-policy-area/'+id
				})
				this.talentarr=res.data
			},
			async getpolicy(id){
				const res = await this.$NET({
					url:'/prod-api/api/youth-inn/talent-policy/list',
					data:{
						areaId:id
					}
				})
				this.policylist=res.data
			}
		}
		
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.policy{
		h3{
			padding: 20rpx;
		}
		.item{
			border-bottom: 1px solid #999999;
			padding: 20rpx;
			margin: 20rpx;
			.title{
				font-size: 20px;
				font-weight: bold;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.top{
		margin: 20rpx;
		image{
			width: 100%;
		}
		.txt{
			background-color: #fff;
			padding: 20rpx;
		}
	}
</style>
