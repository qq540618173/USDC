<template>
	<view class="choice">
		<header-bar :isBack="false" :isBlankBack="true" :title="title"></header-bar>
		<view class="container">
			<view class="item" @tap="gotoPage(`modify?type=${type}&title=${title}`)">
				<text>通过验证码{{title}}</text>
			</view>
			<view class="item" @tap="gotoPage(`modify?type=${type}&mode=${type}&title=${title}`)">
				<text>通过原密码{{title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue';
	export default {
		data() {
			return {
				title: '',
				type: '',
			}
		},
		components:{
			HeaderBar
		},
		onLoad(options) {
			console.log(options)
			this.title = options.title
			this.type = options.type
		},
		methods: {
			gotoPage(url){
				uni.navigateTo({
				    url
				});
			},
		},
		computed: {  
			i18n () {
				return this.$t('index')  
			}  
		}
	}
</script>

<style lang="scss">
.choice{
	.container{
		min-height: calc(100vh - 128rpx);
		background-color: #F6F7FB;
		padding: 0;
		.item{
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 8rpx;
			background-color: #FFFFFF;
			font-size: 26rpx;
			color: #2D2D2D;
			padding: 0 30rpx;
			position: relative;
			border-top: 1px solid #F6F7FB;
			&::after{
				content: "";
				display: block;
				width: 48rpx;
				height: 48rpx;
				background: url(../../static/images/icon18.png) no-repeat;
				background-size: contain;
				position: absolute;
				right: 20rpx;
				top: 26rpx;
			}
		}
	}
}
</style>
