<template>
	<view>
		<view class="top">
			<image src="../../../static/images/traffic1.jpg" mode=""></image>
		</view>
		<view class="item">
			<view class="left">号牌种类：</view>
			<view class="right">
				<picker mode="selector" :range="arr" @change="changecate">
					<view>{{arr[onindex]}}</view>
				</picker>
			</view>
		</view>
		<view class="item">
			<view class="left">车牌号：</view>
			<view class="right">
				<view class="che">
					
				<picker mode="selector" :range="array" @change="changein" range-key="name">
					<view>{{array[index].name}}</view>
				</picker>
				<input type="text" v-model="num" placeholder="输入车牌" />
				</view>
			</view>
		</view>
		<view class="item">
			<view class="left">发动机号：</view>
			<view class="right">
				<input type="text" v-model="catenum" placeholder="请输入发动机号(非必填)" />
			</view>
		</view>
		<view class="btn" @click="golist">查询</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr:['汽车','厢货车','卡车','半挂'],
				onindex:0,
				array: [
					{name:'京'},{name: '津'}, {name:'沪'}, {name:'渝'},
					{name:'宁'},{name: '陕'}, {name:'甘'}, {name:'苏'},
					{name:'浙'},{name: '闽'}, {name:'赣'}, {name:'云'},
					{name:'贵'},{name: '皖'}, {name:'港'}, {name:'澳'},
					{name:'台'},{name: '琼'}, {name:'辽'}, {name:'吉'},
					{name:'黑'},{name: '蒙'}, {name:'青'}, {name:'藏'},
					{name:'川'},{name: '新'}, {name:'鲁'}, {name:'桂'},
					{name:'豫'},{name: '冀'}, {name:'鄂'}, {name:'湘'},
					{name:'粤'},{name:'晋'}
				],
				index:0,
				piclist:[],
				num:'',
				catenum:'',
				tit:'京'
			};
		},
		onLoad() {
			this.getpic()
		},
		methods:{
			golist(){
				if (this.num.length==0) {
					uni.showToast({
						title:'请输入车牌号',
						icon:'none'
					})
				} else if(this.num.length!=6){
					uni.showToast({
						title:'请输入正确车牌号',
						icon:'none'
					})
				}
				else{
					let info={num:this.tit+this.num,fadong:this.catenum}
					setTimeout(()=>{
						uni.$emit('datacar',{data:info})					
					},200)
					uni.navigateTo({
						url:'./tralist'
					})
				}
			},
			changein(e){
				this.index=e.detail.value,
				this.tit=this.array[this.index].name
				console.log(this.tit);
			},
			changecate(e){
				this.onindex=e.detail.value
			},
			async getpic(){
				const res = await this.$NET({
					url:'/prod-api/api/traffic/rotation/list'
				})
				this.piclist=res.rows
				// console.log(res);
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.top{
				padding: 20rpx;
				
			image{
				width: 100%;
				border-radius: 20rpx;
			}
		
	}
	.item{
		display: flex;
		margin: 20rpx;
		padding: 20rpx;
		border-bottom: 1px solid #999999;
		.right{
			.che{
				display: flex;
				align-items: center;
				input{
					
				padding: 0 20rpx;
				}
			}
		}
	}
</style>
