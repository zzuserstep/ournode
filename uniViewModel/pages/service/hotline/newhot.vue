<template>
	<view>
		<uni-list>
			<uni-list-item title="诉求分类" v-show="show">
				<template slot="footer">
					<picker mode="selector" :range="name"  @change="change">
						<view>{{name[index]}}</view>
					</picker>
				</template>
			</uni-list-item>
			<uni-list-item title="标题">
				<template slot="footer">
					<input class="uni-input" v-model="title" placeholder="请输入" />
				</template>
			</uni-list-item>
			<uni-list-item title="诉求内容">
				<template slot="footer">
					<input class="uni-input" v-model="content" placeholder="请输入" />
				</template>
			</uni-list-item>
			<uni-list-item title="承办单位">
				<template slot="footer">
					<input class="uni-input" v-model="taker" placeholder="请输入" />
				</template>
			</uni-list-item>
			<uni-list-item title="照片">
				<template slot="footer">
					<view class="avatar" @click="chooseimg">
						<image :src="avaSr" mode="scaleToFill"></image>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="btn" @click="goeal">上传诉求</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avaSr:'../../../static/images/R-C.jpg',
				avaSrc:'',
				tempFilePaths:null,
				title:'',
				content:'',
				taker:'',
				id:'',
				name:[],
				index:0,
				list:[],
				show:false
			};
		},
		onLoad(e) {
			this.getcate()
			console.log(e);
			this.id=e.id
			if(e.id=='23'){
				this.show=true
			}
		},
		methods:{
			change(e){
				console.log(e);
				this.index=e.detail.value
				this.id=this.list[this.index].id
				console.log(this.id);
			},
			async getcate(){
				const res = await this.$NET({
					url:'/prod-api/api/gov-service-hotline/appeal-category/list'
				})
				console.log(res);
				this.list=res.rows
				res.rows.forEach((item)=>{
					this.name.push(item.name)
				})
			},
			async goeal(){
				if(this.title.length==0 || this.content.length==0 || this.taker.length==0){
					uni.showToast({
						title:'输入完整内容',
						icon:'none'
					})
				}else{
					const res = await this.$NET({
						url:'/prod-api/api/gov-service-hotline/appeal',
						method:'POST',
						data:{
							appealCategoryId: this.id,
							title: this.title,
							content: this.content,
							undertaker:this.taker,
							imgUrl: this.avaSrc
						}
					})	
					if(res.code==200){
						uni.showToast({
							title:'提交成功',
							icon:'success'
						})
						this.title='',
						this.content='',
						this.taker=''
						
					}else{
						uni.showToast({
							title: '修改失败，请重试！',
							icon: 'none'
						})
					}
				}
				
			},
			chooseimg(){
				uni.chooseImage({
					count:1,
					sizeType:'compressed' ,
					success: (res) => {
						console.log(res);
						this.tempFilePaths=res.tempFilePaths[0];
						this.avaSr=res.tempFilePaths[0]
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
						this.avaSrc='/prod-api'+JSON.parse(res.data).fileName
						if(res.statusCode == 200){							
							uni.showToast({
								title: '图片上传成功！',
								icon: 'none'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.avatar{
		image{
			width: 120rpx;
			height: 80rpx;
		}
	}
	.uni-input{
		text-align: right;
	}
		.btn{
			margin: 20rpx;
			width: 600rpx;
			height: 80rpx;
			background-color: #2979FF;
			text-align: center;
			line-height: 80rpx;
			color: #fff;
			border-radius: 30rpx;
			margin-left: 70rpx;
		}
	
</style>
