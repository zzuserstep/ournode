<template>
	<view>
		<view class="showdet">
		<view class="top">
			<view class="name">{{parkDet.parkName}}</view>
			<view class="distance">{{parkDet.distance}}公里</view>
		</view>
		<view class="center">
			<view class="header">
				<view class="up">对外开放</view>
				<view class="pic">
					<image src="../../../static/icons/postion.png" ></image>
					<text class="address">{{parkDet.address}}</text>
				</view>
			</view>
			<view class="bot">
				<view class="title">车位信息</view>
				<view class="det">
					<view class="money">
						<view>停车费</view>
						<view class="mondet">
							<text class="yuan">{{parkDet.rates}}元/</text><text class="hour">小时</text>
						</view>
					</view>
					<view class="mail">
						<view>车位</view>
						<view class="parknum">
							<text class="sheng">{{parkDet.priceCaps}}/</text><text class="zong">{{parkDet.allPark}}</text>
						</view>
					</view>
				</view>				
			</view>
		</view>
		<view class="bottom">
			<view class="tit">收费参考</view>
			<view class="show">每小时{{parkDet.rates}}元，最高每天{{parkDet.vacancy}}元</view>
		</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				parkDet:[]
			};
		},
		onLoad(e) {
			this.getParkDetail(e.id)
		},
		methods:{
			async getParkDetail(id){
				const res = await this.$NET({
					url:'/prod-api/api/park/lot/'+id
				})
				console.log(res);
				this.parkDet=res.data
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
		.showdet{
			margin: 20rpx;
			background-color: #fff;
			border-radius: 20rpx;
			padding: 10rpx;
			.top{
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				color: #2979FF;
				border-bottom: 1px solid #6aabff;
			}
			.center{
				.header{
					border-bottom: 1px solid #999999;
					.up{
						font-size: 20px;
						padding:20rpx;
					}
					.pic{
						padding: 20rpx 40rpx;
						image{
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
				.bot{
					border-bottom: 1px solid #999999;
					padding: 20rpx;
					.title{
						font-weight: bold;
						padding: 10rpx;
					}
					.det{
						display: flex;
						font-size: 18px;
						.money{
							color: #ffa237;
							padding-right: 80rpx;
							.mondet{
								.yuan{
									font-size: 30px;
								}
							}
						}
						.mail{
							color: #5500ff;
							padding-left: 80rpx;
							.parknum{
								.sheng{
									font-size: 30px;
								}
							}
						}
					}
				}
			}
			.bottom{
				padding: 20rpx;
				.show{
					color: #007AFF;
					padding-top: 20rpx;
				}
			}
		}
</style>
