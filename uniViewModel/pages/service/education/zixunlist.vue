<template>
	<view>
		<u-subsection :list="list" :current="index" @change="change"></u-subsection>
		<view class="yes" v-if="index==0">	
			<uni-card  v-for="item in yeslist" :key="item.id"
			@click="godet(item.lawyerId,item.id)">
				<view class="tit">{{item.lawyerName}}</view>
				<view class="tit">法律专长：{{item.legalExpertiseName}}</view>
				<view class="tit">受理状态：{{item.state=='0'?'未受理':'已受理'}}</view>
				<view class="tit">提交时间：{{item.createTime}}</view>
			</uni-card>
			<view class="noone" v-if="yeslist.length==0">
				<uni-card>
					<view class="name">还未有</view>
				</uni-card>
			</view>
		</view>
	
		<view class="no" v-if="index==1">
			<uni-card   v-for="item in nolist" :key="item.id" 
			@click="godet(item.lawyerId,item.id)">
				<view class="tit">{{item.lawyerName}}</view>
				<view class="tit">法律专长：{{item.legalExpertiseName}}</view>
				<view class="tit">受理状态：{{item.state=='0'?'未受理':'已受理'}}</view>
				<view class="tit">提交时间：{{item.createTime}}</view>
			</uni-card>
			<view class="noone" v-if="nolist.length==0">
				<uni-card>
					<view class="name">还未有</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				list:['已受理','未受理'],
				nolist:[],
				yeslist:[]
			};
		},
		onLoad() {
			this.getlist()
		},
		methods:{
			change(e){
				this.index=e
			},
			godet(e,i){
				uni.navigateTo({
					url:`zidet?laid=${e}&id=${i}`
				})
			},
			async getlist(){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/legal-advice/list'
				})
				console.log(res);
				res.rows.forEach((item)=>{
					if (item.state=='0') {
						this.nolist.push(item)
					} else{
						this.yeslist.push(item)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.name{
		text-align: center;
		font-size: 16px;
		font-weight: bold;
		padding: 40rpx 0;
	}
	.tit{
		font-size: 14px;
		padding: 10rpx;
	}
</style>
