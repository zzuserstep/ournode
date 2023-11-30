<template>
	<view>
		<swiper style="height: 320px;">
			<swiper-item >
				<view class="swiper-item">
					<u-grid :col="4" :border="false">
						<u-grid-item v-for="item in icon" :key="item.id" 
						@click.native="golist">
							<u-icon :name="base+item.imgUrl" size="65"></u-icon>
							<text class="name">{{item.name}}</text>
						</u-grid-item>
					</u-grid>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:'http://124.93.196.45:10001',
				icon:[],
				
			};
		},
		onLoad() {
			this.geticon()
		},
		methods:{
			golist(){
				uni.navigateTo({
					url:'lawlist'
				})
			},
			async geticon(){
				const res = await this.$NET({
					url:'/prod-api/api/lawyer-consultation/legal-expertise/list'
				})
				this.icon=res.rows
				console.log(this.icon);
				
			},
		}
	}
</script>

<style lang="scss">

</style>
