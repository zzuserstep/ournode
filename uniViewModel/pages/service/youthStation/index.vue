<template>
	<view>
		<view class="top">
			<image src="../../../static/images/young.jpg" mode=""></image>
			<view class="txt">
				驿站为来连创业就业的高校毕业生提供7天免费住宿，同时提供创业指导、就业政策、城市融入、党团建设等一站式落脚服务阵地。驿站共设5个房间24个床位，每间房间配套上下床铺、储物柜、桌椅、冰箱、洗衣机，配置厨房、独立洗手间，具备良好的住宿、办公和团队活动环境真正实现拎包入住。
			</view>
		</view>
		<view class="center">
			<h3>人才政策区域</h3>
			<view class="pic">
				<view class="item" v-for="item in peoplist" :key="item.id" @click="goworkdet(item.id)">
					<image :src="base+item.imgUrl" mode=""></image>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<h3>青年驿站列表</h3>
			<view class="youth" v-for="(item,index) in youthlist" :key="item.id">
				<view class="left">
					<image :src="base+item.coverImgUrl" mode=""></image>
				</view>
				<view class="right">
					<view class="name">{{item.name}}</view>
					<view class="shen">
						<view class="tit">剩余床位</view>
						<view class="sex">
							<view class="boy">男:{{item.bedsCountBoy}}</view>
							<view class="girl">女:{{item.bedsCountGirl}}</view>
						</view>
					</view>
					<view class="address" @click="goyouthdet(item.id)">{{item.address}}</view>
					<u-collapse >
						<u-collapse-item title="站点介绍">{{item.introduce}}</u-collapse-item>
					</u-collapse>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				peoplist:[],
				youthlist:[],
				num:null,
				showall:false,
				
			};
		},
		onLoad() {
			this.getpeople(),
			this.getyouth()
		},
		methods:{
			goyouthdet(id){
				uni.navigateTo({
					url:`./youthdet?id=${id}`
				})
			},
			goworkdet(id){
				uni.navigateTo({
					url:`./workdet?id=${id}`
				})
			},
			orshow(i){
				this.showall=!this.showall
				if (this.showall) {
					this.num=i
				} else{
					this.num=null
				}
			},
			async getpeople(){
				const res = await this.$NET({
					url:'/prod-api/api/youth-inn/talent-policy-area/list'
				})
			this.peoplist=res.data
			},
			async getyouth(){
				const res = await this.$NET({
					url:'/prod-api/api/youth-inn/youth-inn/list'
				})
			this.youthlist=res.rows
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.bottom{
		margin: 20rpx;
		h3{
			padding: 20rpx;
		}
		.youth{
			display: flex;
			margin: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			.left{
				image{
					width: 150rpx;
					height: 150rpx;
				}
				padding-right: 20rpx;
			}
			.right{
				.name{
					font-weight: bold;
				}
				.shen{
					color: #909399;
					.sex{
						display: flex;
						justify-content: space-between;
					}
				}
				.address{
					font-size: 14px;
					padding-bottom: 15rpx;
				}
				
			}
		}
	}
	.top{
		margin: 20rpx;
		image{
			width: 100%;
			border-radius: 20rpx;
		}
		.txt{
			padding: 20rpx;
			background-color: #fff;
			text-indent: 2em;
		}
	}
	.center{
		h3{
			padding: 20rpx;
		}
		.pic{
			display: flex;
			.item{
				width: 130px;
				height: 289px;
				overflow: hidden;
				border: 1px solid #f0f0f0;
				background-color: #fff;
				margin: 10rpx;
				box-shadow: 2px 3px 4px #d2d2d2;
			}
			.name{
				font-size: 16px;
				text-align: center;
				line-height: 40px;
			}
		}
	}
</style>
