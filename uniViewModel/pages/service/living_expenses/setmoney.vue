<template>
	<view>
		<view class="item">
			<view class="left">项目名称</view>
			<view class="right">
				<picker mode="selector" :range="list" @change="changecate" range-key="na">
					<view>{{list[index].na}}</view>
				</picker>
			</view>
		</view>
		<view class="item">
			<view class="left">手机号</view>
			<view class="right">{{phone}}</view>
		</view>
		<view class="pic" >
			<view class="it" v-for="(item,index) in pic" :key="index" :class="index==num?'active':''" @click="set(index)">			
			<image :src="item.url" style="width: 100rpx; height: 100rpx;"></image>
			</view>
		</view>
		<view class="btn" @click="setcate">去支付</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				pic:[
					{url:'../../../static/50.png',value:'50'},
					{url:'../../../static/100.png',value:'100'},
					{url:'../../../static/2.png',value:'200'}
				],
				list:[
					{na:'自由充值',type:'1',id:''},
					{na:'充50减一',type:'2',id:'1'},
					{na:'冲一百减二',type:'2',id:'2'},
					{na:'充二百减四',type:'2',id:'3'}
					],
					index:0,
					num:null,
					money:null,
					type:null,
					ruid:null
			};
		},
		onLoad() {		
			// this.getcate()
		},
		onShow() {
			uni.$on('info',(item)=>{
				console.log(item.data);
				this.phone=item.data.telnum
			})
		},
		methods:{
			changecate(e){
				this.index=e.detail.value
				this.type=this.list[this.index].type
				this.ruid=this.list[this.index].id
			},
			set(e){
				this.num=e
				this.money=this.pic[e].value
			},
			async setcate(){
				const res = await this.$NET({
					url:'/prod-api/api/living/phone/recharge',
					method:'POST',
					data:{
						paymentType: "电子支付",
						phonenumber:this.phone,
						rechargeAmount:this.money,
						ruleId: this.ruid,
						type: this.type
					}
				})
				console.log(res);
			}
		
		}
	}
</script>

<style lang="scss">
	.item{
		display: flex;
		justify-content: space-between;
		font-size: 20px;
		margin: 20rpx;
		padding: 20rpx;
	}
	.pic{
			display: flex;
			justify-content: center;
		.it{
			padding: 15rpx 40rpx;
			&.active{
				background-color: #e4e4e4;
			}
		}
	}
</style>
