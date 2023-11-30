<template>
	<view>
		<uni-list>
			<uni-list-item title="姓名">
				<template v-slot:footer>
							<input type="text" v-model="name" placeholder="请输入姓名" class="uni-input" />
						</template>
			</uni-list-item>
			<uni-list-item title="性别">
				<template slot="footer">
					<view>
						 <radio-group @change="radioChange">
							<label class="radio" v-for="(item,index) in sexlist" :key="item.value">
								<radio style="transform:scale(0.7)" :value="item.value" :checked="index == current" />
								{{item.name}}
							</label>
						</radio-group>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="出生年月">
				<template v-slot:footer>
							<picker mode="date" :start="startDate" :value="data" :end="endDate" @change="bindDateChange">
								<view>{{data}}</view>
							</picker>
						</template>
			</uni-list-item>
			<uni-list-item title="手机">
				<template v-slot:footer>
							<input type="text" v-model="phoneNumber" placeholder="请输入手机号" class="uni-input" />
						</template>
			</uni-list-item>
			<uni-list-item title="身份证">
				<template v-slot:footer>
							<input type="text" v-model="idCard" placeholder="请输入身份证号" class="uni-input" />
						</template>
			</uni-list-item>
			<uni-list-item title="住址">
				<template v-slot:footer>
							<input type="text" v-model="address" placeholder="请输入住址" class="uni-input" />
						</template>
			</uni-list-item>
		</uni-list>
		<view class="bun">
			<view class="no" @click="back">取消</view>
			<view class="yes" @click="setPerson">确定</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api.js'
	export default {
		data() {
			return {
				name:'',
				phoneNumber:'',
				idCard:'',
				address:'',
				data:this.getDate({
					format: true
					}),
				sexlist: [
					{value: '男', name: '男', checked: 'true'},
					{value: '女', name: '女', checked: 'true'},
				],	
				current:0,
				type:'',
				id:''
			};
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
			onLoad(e) {
				// console.log(e);
				this.type=e.type;
				if(e.type == 1) {
					uni.setNavigationBarTitle({
					    title: '新增就诊人'
					});
				} else {
					uni.setNavigationBarTitle({
					    title: '编辑就诊人信息'
					});
					this.getpatient(e.index)
				}
				
			},
		methods:{
			async getpatient(i){
				const res = await this.$NET({
					url:api.PATIENT_LIST
				})
				this.name=res.rows[i].name,
				this.current=res.rows[i].sex,
				this.data=res.rows[i].birthday,
				this.idCard=res.rows[i].cardId,
				this.phoneNumber=res.rows[i].tel,
				this.address=res.rows[i].address,
				this.id=res.rows[i].id
			},
			bindDateChange: function(e) {
			            this.data = e.detail.value
			        },
			 getDate(type) {
			            const data = new Date();
			            let year = data.getFullYear();
			            let month = data.getMonth() + 1;
			            let day = data.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			        },
					radioChange(e){
						console.log(e);	
						if(e.detail.value=='女'){
							this.current=1
						}else{
							this.current=0
						}
						console.log(this.current);
					},
					back(){
						uni.navigateTo({
							url:'./personList'
						})
					},
				async setPerson(){
						if(this.name.length==0 || this.idCard.length==0 || this.phoneNumber.length==0 || this.address.length==0){
							uni.showToast({
								title: '请输入完整信息！',
								icon: 'none'
							})
						} else if(this.phoneNumber.length!=11){
							uni.showToast({
								title: '请输入正确手机号！',
								icon: 'none'
							})
						} else if(this.idCard.length!=18){
							uni.showToast({
								title: '请输入真实身份证号！',
								icon: 'none'
							})
						}else{
							if(this.type=='1'){
								const res =await this.$NET({
									url:api.ADD_PATIENT,
									method:'POST',
									data:{
										name:this.name,
										sex:this.current,
										birthday:this.data,
										cardId:this.idCard,
										tel:this.phoneNumber,
										address:this.address
									}
								})
								if(res.code==200){
									uni.showToast({
										title:'添加成功'
									})
									setTimeout(()=>{
										uni.navigateTo({
											url:'./personList'
										})
									},1200)
								}else{
									uni.showToast({
										title:res.msg
									})
								}
								
							}else{
								const res =await this.$NET({
									url:api.ADD_PATIENT,
									method:'PUT',
									data:{
										id:this.id,
										name:this.name,
										sex:this.current,
										birthday:this.data,
										cardId:this.idCard,
										tel:this.phoneNumber,
										address:this.address
									}
								})
								if(res.code==200){
									uni.showToast({
										title:'修改成功'
									})
									setTimeout(()=>{
										uni.navigateTo({
											url:'./personList'
										})
									},1200)
								}else{
									uni.showToast({
										title:res.msg
									})
								}
							}
						}
					},
		}
		
	}
</script>

<style lang="scss">
	.uni-input{
		text-align: right;
	}
	.bun{
		display: flex;
		justify-content: space-between;
		margin: 30rpx;
		.no{
			width: 280rpx;
			height: 80rpx;
			color: #6e78f7;
			border: 1px solid #6e78f7;
			border-radius: 50rpx;
			text-align: center;
			line-height: 80rpx;
		}
		.yes{
			width: 280rpx;
			height: 80rpx;
			color: #fff;
			background-color:#6e78f7 ;
			border-radius: 50rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
</style>
