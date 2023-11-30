<template>
	<view>
		<view class="mine">
			<uni-card v-for="item in list" :key="item.id" @click="godet(item.id)">
				<view class="title">标题：{{item.title}}</view>
				<view class="title">承办单位：{{item.undertaker}}</view>
				<view class="title">提交时间：{{item.createTime}}</view>
				<view class="title">处理状态：{{item.state==0?'未处理':'已处理'}}</view>
			</uni-card>
		
		<button type="primary" style="width: 80%; margin: 30px;" 
		@click="add" >查看更多</button>
		</view>
		<view class="bottom">			
		<button type="primary" style="width: 80%; margin: 10px 30px;" 
		@click="go" >新建诉求页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				id:'',
				total:null,
				num:1
			};
		},
		onLoad(e) {
			this.id=e.id
			this.getlist()
		},
		methods:{
			go(){
				uni.navigateTo({
					url:`newhot?id=${this.id}`
				})
			},
			godet(id){
				uni.navigateTo({
					url:`det?id=${id}`
				})
			},
			add(){
				this.num+=1
				if (Math.ceil(this.total/10)>=this.num) {
					this.getlist()
				} else{
					uni.showToast({
						title:'没有更多了',
						icon:'none'
					})
				}
			},
			async getlist(){
				const res = await this.$NET({
					url:'/prod-api/api/gov-service-hotline/appeal/list',
					data:{
						appealCategoryId:this.id,
						pageNum:this.num,
						pageSize:10
					}
				})
				this.total=res.total
				res.rows.map((item)=>{
					this.list.push(item)
				})
				console.log(this.total);
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.mine{
		padding-bottom: 120rpx;
	}
	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #fff;
	}
</style>
