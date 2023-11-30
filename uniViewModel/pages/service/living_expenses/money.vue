<template>
	<view>
		<uni-list-item title="运营商">
			<template v-slot:footer>
				<picker  :range="list" @change="getvalue" :value="index">
					<view>{{list[index]}}</view>
				</picker>
			</template>
		</uni-list-item>
		<uni-list-item title="手机">
			<template v-slot:footer>
				<input type="text" v-model="telnum" placeholder="请输入" class="input" />
			</template>
		</uni-list-item>
		<view class="btn" @click="goset">查询</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:['中国移动','中国电信','中国联通'],
				index:0,
				telnum:''
			};
		},
		methods:{
			
		getvalue(e){
			this.index=e.target.value
		},
		goset(){
			if (this.telnum.length!=11) {
				uni.showToast({
					title:'手机号码不正确',
					icon:'none'
				})
			} else{		
				let info={yunyng:this.list[this.index],telnum:this.telnum}
				setTimeout(()=>{
					uni.$emit('info',{data:info})
				},500)
				uni.navigateTo({
					url:'./setmoney'
				})
			}
		}
		}
	}
</script>

<style lang="scss">
	input{
		text-align: right;
	}
</style>
