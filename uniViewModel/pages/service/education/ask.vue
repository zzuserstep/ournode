<template>
	<view>
		<view class="lawyer">
			<uni-card>
				<view class="item">			
				<view class="left">
					<image :src="base+lawyer.avatarUrl" mode=""></image>
				</view>
				<view class="right">
					<view class="header">
						<view class="zuo">
							<view class="name">{{lawyer.name}}</view>
							<text class="time">{{lawyer.workStartAt}}</text>
							<text class="num"style="padding-left: 10rpx;">
								咨询人数:{{lawyer.serviceTimes}}</text>
						</view>
					</view>
					<text class="shan">法律专长:{{lawyer.legalExpertiseName}}</text>
					<text class="good">好评率：{{lawyer.favorableRate}}</text>
				</view>
				
				</view>
			</uni-card>		
		</view>
		
		<uni-list>
			<uni-list-item title="问题类型">
				<template v-slot:footer>
					<view class="title" @click="set">{{title}}</view>
				</template>
			</uni-list-item>
			<uni-list-item title="问题描述">
				<template v-slot:footer>
					<input type="text" v-model="question" placeholder="请输入"/>
				</template>
			</uni-list-item>
			<uni-list-item title="手机号">
				<template v-slot:footer>
					<input type="text" v-model="tel" placeholder="请输入"/>
				</template>
			</uni-list-item>
			<uni-list-item title="图片">
				<template v-slot:footer>
					<view class="acater" @click="chooseimg">
						
					<image :src="ava" style="width: 120rpx; height: 100rpx;"></image>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="but">		
		<button type="primary" @click="setques">提交</button>
		</view>
		<view class="show" >
		<uni-transition :mode-class="fade" :show="show" >
			<u-grid :col="4" :border="false">
				<u-grid-item v-for="item in icon" :key="item.id" 
				@click.native="reget(item)">
					<u-icon :name="base+item.imgUrl" size="65"></u-icon>
					<text class="name">{{item.name}}</text>
				</u-grid-item>
				<view class="all" @click="set">取消</view>
			</u-grid>		
		</uni-transition>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				lawyer:[],
				id:null,
				title:'请选择',
				ava:'../../../static/icons/add.png',
				pic:'',
				question:'',
				tel:'',
				laid:'',
				icon:[],
				show:false,
				fade:'slide-bottom',
				tempFilePaths:''
			};
		},
		onLoad(e) {
			this.id=e.id
			this.getdata()
			this.geticon()
		},
		methods:{
			set(){
				this.show=!this.show
			},
			reget(e){
				this.laid=e.id
				this.title=e.name
				this.show=!this.show
			},
			chooseimg(){
				uni.chooseImage({
					count:1,
					sizeType:'compressed' ,
					success: (res) => {
						console.log(res);
						this.tempFilePaths=res.tempFilePaths[0];
						this.ava=res.tempFilePaths[0]
						this.unloade()
					}
				})
			},
			unloade(){
				let token= uni.getStorageSync('token')
				uni.uploadFile({
					url:'http://124.93.196.45:10001/prod-api/common/upload',
					header:{
						'Authorization': token
					},
					filePath:this.tempFilePaths,
					name:'file',
					success: (res) => {
						console.log(JSON.parse(res.data).fileName);
						this.pic='/prod-api'+JSON.parse(res.data).fileName
						console.log(this.pic);
						if(res.statusCode == 200){							
							uni.showToast({
								title: '图片上传成功！',
								icon: 'none'
							})
						}
					}
				})
			},
			async setques(){
				if(this.question.length==0 || this.tel.length==0){
					uni.showToast({
						title:'请输入完整内容',
						icon:'none'
					})
				}else{
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/legal-advice',
					method:'POST',
					data:{
						lawyerId:this.id,
						legalExpertiseId:this.laid,
						content:this.question,
						imageUrls:this.pic,
						phone:this.tel
					}
				})
				if (res.code==200) {
					uni.showToast({
						title:'提交成功',
						icon:'success'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:`lawyerdet?id=${this.id}`
						})
					},1000)
				} else{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
				}
			},
			async geticon(){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/legal-expertise/list'
				})
				this.icon=res.rows
				console.log(this.icon);
			},
			async getdata(){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/lawyer/'+this.id
				})
				this.lawyer=res.data
			}
		}
	}
</script>

<style lang="scss">
	input{
		text-align: right;
	}
	.show{
		width: 100%;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		padding:10rpx;
		.all{
			width: 100%;
			text-align: center;
			padding: 10rpx;
			border: 1px solid #EBEEF5;
			border-radius: 20rpx;
		}
	}
	.but{
		margin: 20rpx;
	}
	.lawyer{
		font-size: 13px;
		
			.item{
				display: flex;
				padding: 15rpx;
				.left{
					image{
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
					}
				}
				.right{
					padding-left: 20rpx;
					.header{
						display: flex;
						align-items: center;
						padding-bottom: 20rpx;
						justify-content: space-between;
						.you{
							padding-left: 40rpx;
							.but{
								color: #fff;
								background-color: #007AFF;
								padding: 15rpx;
								border-radius: 15rpx;
							}
						}
					}
					.good{
						padding-left: 20rpx;
					}
				}
			}
		
	}
</style>
