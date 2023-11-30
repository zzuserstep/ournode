<template>
	<view>
		<view class="bun">
			<view :class="type==1?'yes':'no'" @click="bingo">专家诊</view>
			<view :class="type==2?'yes':'no'" @click="mistake">普通诊</view>
		</view>
		<view class="list">
			<uni-list v-for="(item,index) in mangerlist" :key="item.id">
				<uni-list-item showArrow :title="item.categoryName" link @click="goorder(item)"/>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api.js'
	export default {
		data() {
			return {
				type:1,
				mangerlist:[],
				name:''
			};
		},
		onLoad(e) {
			this.getmanger(),
			this.name=e.name
			console.log(this.name);
		},
		methods:{
			goorder(item){
				
				uni.navigateTo({
					url:`./ordermail?name=${this.name}&item=${encodeURIComponent(JSON.stringify(item))}`
				})
				uni.$off('appointingo');
			},
			bingo(){
				this.type=1,
				this.getmanger()
			},
			mistake(){
				this.type=2,
				this.getmanger()
			},
			async getmanger(){
				const res =await this.$NET({
					url:api.HOSPITAL_TYPE,
					data:{
						type:this.type
					}
				})
				// console.log(res);
				this.mangerlist=res.rows
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.bun{
		display: flex;
		justify-content: space-between;
		margin: 30rpx;
		.no{
			width: 280rpx;
			height: 80rpx;
			color: #6e78f7;
			border: 1px solid #6e78f7;
			border-radius: 50rpx;
			text-align: center;
			line-height: 80rpx;
		}
		.yes{
			width: 280rpx;
			height: 80rpx;
			color: #6e78f7;
			text-align: center;
			line-height: 80rpx;
			color: #fff;
			background-color:#6e78f7 ;
			border-radius: 50rpx;
		}
	}
</style>
