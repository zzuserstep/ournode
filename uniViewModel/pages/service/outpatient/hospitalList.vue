<template>
	<view>
		<view class="hoslist"  v-for="(item,index) in hostlist" :key="index" @click="gohosdet(item.id)">	
				<view class="allhos">
					<view class="slot-hos">				
							<image class="slot-image" :src="base+item.imgUrl" mode="widthFix"></image>
							<view class="txtname" style="width: 100%;line-height: 38px;">{{item.hospitalName}}</view>	
					</view>	
						<view class="score">
							<uni-rate :size="14" :value="item.level" />
						</view>
				</view>		
		
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api.js'
	export default {
		data() {
			return {
				base:api.BASE_URL,
				hostlist:[]
			};
		},
		onLoad() {
			this.gethoslist()
		},
		methods:{
			async gethoslist(){
				const res = await this.$NET({
					url:api.HOSPITAL_LIST
				})
				this.hostlist=res.rows
				// console.log(this.hostlist);
			},
			gohosdet(e){
				uni.navigateTo({
					url:`./hospitalDet?id=${e}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.slot-hos{
		display: flex;
		padding: 50rpx;
		.slot-image{
			width: 70px;
		}
		.txtname{
			line-height: 40px;
			padding-left: 20rpx;
		}
	}
	
	.allhos{
		display: flex;
		justify-content: space-between;
		border-bottom: 2px solid #e8e8e8;
		.score{
			padding: 30px 20px;
		}
	}
</style>
