<template>
	<view>
		<view class="top">
			<u-search @custom="set" v-model="search" :show-action="false"></u-search>
		</view>
		<view class="pic">
			<u-swiper :list="pic" name="url" :effect3d="true" height="450"></u-swiper>
		</view>
		<view class="icons">
		<view class="icon" v-for="(item,index) in icon" :key="index">
			<navigator :url="item.to">
			<image :src="item.url" style="width: 100rpx; height: 100rpx;"></image>
			<view class="name">{{item.name}}</view>	
			</navigator>				
		</view>
		</view>
		
		<view class="fac">
			<h3>推荐厂商</h3>
			<navigator url="changdet">
			<view class="item">			
			<view class="left">
				<image src="../../static/center/c1.png" style="width: 180rpx; height: 150rpx;"></image>
			</view>
			<view class="right">
				<view class="title">深圳市大疆创新科技有限公司	</view>
			</view>
			</view>
			</navigator>
		</view>
		<view class="fac">
			<h3>推荐产品</h3>
			<navigator url="chandet">
			<view class="item">			
			<view class="left">
				<image src="../../static/center/c3.png" style="width: 180rpx; height: 150rpx;"></image>
			</view>
			<view class="right">
				<view class="title">电动扫地车</view>
			</view>
			</view>
			</navigator>
		</view>
		<view class="fac">
			<h3>推荐方案</h3>
			<navigator url="andet">
			<view class="item">			
			<view class="left">
				<image src="../../static/center/c2.png" style="width: 180rpx; height: 150rpx;"></image>
			</view>
			<view class="right">
				<view class="title">华为智慧园区解决方案</view>
			</view>
			</view>
			</navigator>
		</view>
		<view class="fac">
			<h3>展会活动</h3>
			<navigator url="acdet">
			<view class="item">			
			<view class="left">
				<image src="../../static/center/c4.png" style="width: 180rpx; height: 150rpx;"></image>
			</view>
			<view class="right">
				<view class="title">2022第八届中国（深圳）国际旅游博览会</view>
			</view>
			</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'',
				pic:[
					{url:'../../static/center/a1.jpg'},
					{url:'../../static/center/a2.jpg'},
					{url:'../../static/center/a3.jpg'},
					{url:'../../static/center/a4.jpg'}
				],
				icon:[
					{url:'../../static/center/ic1.png',name:'厂商',to:'changlist'},
					{url:'../../static/center/ic2.png',name:'产品',to:'chanlist'},
					{url:'../../static/center/ic3.png',name:'入驻',to:'ruzhu'},
					{url:'../../static/center/ic4.png',name:'招聘',to:'zhaopin'}
				],
			};
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.top{
		margin: 20rpx;
	}
	.icons{
		display: flex;
		margin: 20rpx;
		.icon{
			width: 25%;
			text-align: center;
			.name{
				font-size: 20px;
				font-weight: bold;
			}
		}
	}
	.fac{
		margin: 20rpx;
		
		.item{
			display: flex;
			align-items: center;
			background-color: #fff;
			border-radius: 20rpx;
			margin: 20rpx;
			padding: 20rpx;
			.right{
				padding-left: 20rpx;
				.title{
					font-weight: bold;
				}
			}
		}
	}
</style>
