<template>
	<view>
		<uni-list>
			<uni-list-item title="头像">
				<template v-slot:footer>
					<view class="img" @click="choseimg">					
					<image :src="temp" ></image>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="昵称">
				<template v-slot:footer>
					<input type="text" v-model="nickname" placeholder="请输入"/>
				</template>
			</uni-list-item>
			<uni-list-item title="性别">
				<template v-slot:footer>
					<radio-group name="">
						<label v-for="(item,index) in sexlist" @click="change(index)">
							<radio :value="item.value" :checked="item.checked" 
							style="transform: scale(0.7);" /><text>{{item.name}}</text>
						</label>
						
					</radio-group>
				</template>
			</uni-list-item>
			<uni-list-item title="手机">
				<template v-slot:footer>
					<input type="text" v-model="telnum" placeholder="请输入"/>
				</template>
			</uni-list-item>
		</uni-list>
		<button type="primary" style="width: 80%; margin: 30px;" @click="changeinfo">修改</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname:'',
				telnum:'',
				sexlist:[
					{name:'男',value:'0',checked:false},
					{name:'女',value:'1',checked:false}
				],
				sex:null,
				temp:'',
				base:'http://124.93.196.45:10001',
				
			};
		},
		onLoad() {
			this.getinfo()
			if (uni.getStorageSync('avator')) {
			this.temp=this.base+uni.getStorageSync('avator')
			} else{
				this.temp='../../static/icons/defaultAt.png'
			}
		},
		methods:{
			choseimg(){			
				uni.chooseImage({
					count:1,
					success: (res) => {
						this.temp=res.tempFilePaths[0]
						this.uploading()
					}
				})
			},
			uploading(){
				uni.uploadFile({
					url:'http://124.93.196.45:10001/prod-api/common/upload',
					header:{
						'authorization':uni.getStorageSync('token')
					},
					filePath:this.temp,
					name:'file',
					success: (res) => {
						console.log(JSON.parse(res.data));
						let pic='/prod-api'+JSON.parse(res.data).fileName
						console.log(pic);
						uni.setStorageSync('avator',pic)
					}
				})
			},
			
			change(e){
				this.sex=e
				// console.log(this.sex);
			},
			getinfo(){
				let infos=[]
				 infos=JSON.parse(uni.getStorageSync('info')),
				this.nickname=infos.nickName
				// console.log(infos);
				if (infos.sex=='0') {
					this.sexlist[0].checked=true
				} else{
					this.sexlist[1].checked=true
				}
				this.telnum=infos.phonenumber.slice(0,7)+'****'
			},
			async changeinfo(){
				if(this.nickname.length==0 || this.telnum.length==0){
					uni.showToast({
						title:'请输入完整内容',
						icon:'none'
					})		
				}else{
					const res = await this.$NET({
						url:'/prod-api/api/common/user',
						method:'PUT',
						data:{
							nickName:this.nickname,
							sex:this.sex,
							phonenumber:this.telnum
						}
					})
					if (res.code==200) {
						
						this.reget()
					} else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				}
			},
			async reget(){
				const res = await this.$NET({
					url:'/prod-api/api/common/user/getInfo'
				})
				uni.setStorage({
					key:'info',
					data:JSON.stringify(res.user),
					success: (re) => {
						uni.showToast({
							title:'修改成功',
							icon:'success'
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'mine'
							})
						},1600)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	image{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	input{
		text-align: right;
	}
</style>
