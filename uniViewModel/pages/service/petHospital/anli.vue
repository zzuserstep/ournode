<template>
	<view>
		<view class="item" >
			<view class="left">
				<image :src="base+datarr.doctor.avatar" mode=""></image>
			</view>
			<view class="right">
				<view class="num">职业编号：{{datarr.doctor.practiceNo}}</view>
				<view class="name"> 姓名：{{datarr.doctor.name}}</view>
				<view class="content">职称：{{datarr.doctor.jobName}}</view>
				<view class="good">擅长：{{datarr.doctor.goodAt}}</view>
				<view class="work">从业：{{datarr.doctor.workingYears}}年</view>
				<view class="anli">问题：{{datarr.question}}</view>
				<!-- <view class="an">回答：{{datarr.remark}}</view> -->
			</view>
		</view>
		<view class="area" v-show="show">
			<textarea v-model="question" placeholder="追问问题" />
		</view>
		<view class="btn" @click="gowenzh()" v-show="!show">去提问</view>
		<view class="btn" @click="rego()" v-show="show">去追问</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datarr:[],
				base:'http://124.93.196.45:10001',
				num:null,
				show:false,
				question:''
			};
		},
		onLoad(e) {
			console.log(e);
			this.datarr=JSON.parse(decodeURIComponent(e.list))
			this.num=e.num
			if(this.num=='1'){
				this.show=true
			}
			console.log(this.datarr);
		},
		methods:{
			gowenzh(){		
					uni.navigateTo({
						url:`./wenzhen?list=${encodeURIComponent(JSON.stringify(this.datarr.doctor))}`
					})
				
			},
			async rego(){
				const res = await this.$NET({
					url:'/prod-api/api/pet-hospital/inquiry-message',
					method:'POST',
					data:{
						content:this.question,
						inquiryId:this.datarr.id
					}
				})
				if(res.code==200){
					uni.showToast({
						title:'追问成功',
						icon:'success'
					})
					this.question=''
				}else{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.item{
		display: flex;
		background-color: #fff;
		border-radius: 20rpx;
		margin: 20rpx;
		padding: 20rpx;
		.left{
			image{
				width: 150rpx;
				height: 150rpx;
			}
		}
		.right{
			padding-left: 20rpx;
			
		}
	}
	.area{
		margin: 20rpx;
		background-color: #fff;
		text-indent: 2em;
		border-radius: 20rpx;
	}
</style>
