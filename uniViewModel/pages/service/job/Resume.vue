<template>
	<view>
		<view class="fromall">
			<view class="from">最高学历</view>
			<view class="fromitem">
				<input type="text" v-model="studytop" placeholder="最高学历"/>
			</view>
		</view>
		<view class="fromall">
			<view class="from">教育经历</view>
			<view class="fromitem">
				<input type="text" v-model="studyon" placeholder="教育经历"/>
			</view>
		</view>
		<view class="fromall">
			<view class="from">工作经验</view>
			<view class="fromitem">
				<input type="text" v-model="workup" placeholder="工作经验"/>
			</view>
		</view>
		<view class="fromall">
			<view class="from">个人简介</view>
			<view class="fromitem">
				<input type="text" v-model="oneself" placeholder="个人简介"/>
			</view>
		</view>
		<view class="fromall">
			<view class="from">期望薪资</view>
			<view class="fromitem">
				<input type="text" v-model="oneslary" placeholder="期望薪资"/>
			</view>
		</view>
		<view class="fromall">
		<view class="from">职位类别</view>	
		<view class="alljob">
			<view class="formin">选择职位</view>
			<picker  :range="postarr" @change="getvalue" :value="postindex">
				<view>{{postarr[postindex]}}</view>
			</picker>
		</view>	
		</view>
		<view class="toone">
			<view class="click" @click="gojianli">{{exit?'修改个人简历':'新增个人简历'}}</view>
		</view>
		 
	</view>
</template>

<script>
	import api from '../../../common/api.js'
	export default {
		data() {
			return {
				studytop:'',
				studyon:'',
				workup:'',
				oneself:'',
				oneslary:'',
				postindex:0,
				postarr:[],
				org:[],
				postid:1,
				exit:false,
			    userId :JSON.parse(uni.getStorageSync('info')).userId
			};
		},
		onLoad() {
			this.getjobpost()
			
		},
		methods:{
			getvalue:function(e){
				this.postindex=e.target.value,
				this.postid=this.org[this.postindex].id,
				console.log(this.postid);
			},
			async getjobpost(){
				const res = await this.$NET({
					url:api.JOB_LIST
				})
				this.org=res.rows
				this.org.forEach(item => {
					this.postarr.push(item.professionName)
				});
				console.log(this.userId);
				// console.log(res);
				// console.log(this.postarr);
			},
			async gojianli(){
				if(this.exit){
					const res =await this.$NET({
						url:api.JOB_RESUME,
						method:'PUT',
						data:{
							id:this.userId,
							mostEducation:this.studytop,
							education:this.studyon,
							experience:this.workup,
							individualResume:this.oneself,
							money:this.oneslary,
							positionId:this.postid
						},
						
					})
					if(res.code == 200) {
						uni.showToast({
							icon: 'success',
							title: res.msg
						});
						// this.getPostlist();
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
					console.log(res);
				}else{
					const res =await this.$NET({
						url:api.JOB_RESUME,
						method:'POST',
						data:{
							mostEducation:this.studytop,
							education:this.studyon,
							experience:this.workup,
							individualResume:this.oneself,
							money:this.oneslary,
							positionId:this.postid
						}
					})
					if(res.code == 200) {
						uni.showToast({
							icon: 'success',
							title: res.msg
						});
						this.exit=true
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				}
			}
		}
		
	}
</script>

<style lang="scss">
	.from{
		background-color: #c4c4c4;
		font-size: 1em;
		padding: 10rpx;
	}
	.fromitem{
		padding: 10rpx;
	}
	.alljob{
		display: flex;
		justify-content: space-between;
		padding: 10rpx;
	}
	.toone{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 9;
	}
	.click {
		width: 680rpx;
		height: 100rpx;
		border-radius: 20rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 45rpx;
		margin: 30rpx;
		color: #fff;
		background-color: #2F80ED;
	}
</style>
