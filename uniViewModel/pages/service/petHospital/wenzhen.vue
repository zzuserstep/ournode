<template>
	<view>
		<view class="item" >
			<view class="left">
				<image :src="base+doctarr.avatar" mode=""></image>
			</view>
			<view class="right">
				<view class="num">职业编号：{{doctarr.practiceNo}}</view>
				<view class="name"> 姓名：{{doctarr.name}}</view>
				<view class="content">职称：{{doctarr.jobName}}</view>
				<view class="good">擅长：{{doctarr.goodAt}}</view>
				<view class="work">从业：{{doctarr.workingYears}}年</view>
			</view>
		</view>
		<view class="question">
			<view class="items">
				<view class="left">问题描述</view>
				<view class="right">
					<textarea v-model="question" placeholder="请输入问题描述" maxlength="150" />
				</view>
			</view>
			<view class="items">
				<view class="left">上传图片</view>
				<view class="right">
					<!-- <textarea v-model="question" placeholder="请输入问题描述" maxlength="150" /> -->
					<image src="../../../static/icons/add.png" style="width: 80rpx; height: 80rpx;" @click="choseimg"></image>
				</view>
			</view>
		</view>
		<view class="btn" @click="setquestion">提交问诊</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				doctarr:[],
				question:'',
				img:''
			};
		},
		onLoad(e) {
			this.doctarr=JSON.parse(decodeURIComponent(e.list))
			console.log(JSON.parse(decodeURIComponent(e.list)));
		},
		methods:{
			choseimg(){
				uni.chooseImage({
					count:1,
					sizeType:'compressed',
					success: (res) => {
						console.log(res.tempFilePaths);
					}
				})
				this.img='/dev-api/profile/upload/image/2022/03/08/21322108-5f54-4356-b1da-27291a7a0bbb.jpg'
			},
			async setquestion(){
				const res = await this.$NET({
					url:'/prod-api/api/pet-hospital/inquiry',
					method:'POST',
					data:{
						doctorId:this.doctarr.id,
						question:this.question,
						imageUrls:this.img
					}
				})
				if (res.code==200) {
					uni.showToast({
						title:'提交成功',
						icon:'success'
					})
					this.question='',
					setTimeout(()=>{
						uni.navigateTo({
							url:'./index'
						})
					},1600)
				} else{
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
	.question{
		background-color: #fff;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		.items{
			.left{
				
				padding: 20rpx;
			}
			.right{
				padding: 20rpx;
				textarea{
					border: 1px solid #e4e4e4;
					border-radius: 20rpx;
					text-indent: 0.8em;
				}
				
			}
		}
	}
</style>
