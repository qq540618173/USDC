<template>
	<view class="download">
		<header-bar :isBg="isBg" :title="i18n.header.header20"></header-bar>
		<!-- <view class="container">
			<view class="download-wrap">
				<view class="logo">
					<image src="../../static/images/icon32.png"></image>
					<text>{{env == 'ios'?i18n.my.lang58_2:i18n.my.lang58_1}}</text>
				</view>
				<view class="link">
					<text>{{env == 'ios'?address.ios_url:address.android_url}}</text>
				</view>
				<view class="download-qr" v-if="env">
					<view class="qrimg">
					    <tki-qrcode
					    ref="qrcode"
					    :cid="cid"
					    :val="env == 'ios'?address.ios_url:address.android_url"
					    :size="size"
					    :unit="unit"
					    :background="background"
					    :foreground="foreground"
					    :pdground="pdground"
					    :loadMake="loadMake"
					    :showLoading="showLoading"
					    :loadingText="loadingText"
					    />
					</view>
				</view>
				<view class="btn-wrap">
					<view class="btn-item gradient-blue" @tap="saveImage">{{i18n.index.lang12}}</view>
					<view class="btn-item gradient-red" @tap="copyAddress">{{i18n.index.lang13}}</view>
				</view>
			</view>
		</view> -->
		<view class="container">
			<view class="mywallet-wrap">
				<view class="line"></view>
				<view class="mywallet-title">
					<image class="top-img" src="../../static/images/icon14.png"></image>
					<text>{{env == 'ios'?i18n.my.lang58_2:i18n.my.lang58_1}}</text>
				</view>
				<view class="address">
					<text>{{env == 'ios'?address.ios_url:address.android_url}}</text>
				</view>
				<view class="download-qr" v-if="env">
					<view class="qrimg">
					    <tki-qrcode
					    ref="qrcode"
					    :cid="cid"
					    :val="env == 'ios'?address.ios_url:address.android_url"
					    :size="size"
					    :unit="unit"
					    :background="background"
					    :foreground="foreground"
					    :pdground="pdground"
					    :loadMake="loadMake"
					    :showLoading="showLoading"
					    :loadingText="loadingText"
					    />
					</view>
				</view>
				<view class="btn-wrap">
					<view class="btn-item blue" @tap="saveImage">{{i18n.index.lang12}}</view>
					<view class="btn-item green" @tap="copyAddress">{{i18n.index.lang13}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue';
	export default {
		data() {
			return {
				address: {},
				env: 'android',
				cid: "1",
				size: 320,
				unit: 'upx',
				background: '#ffffff',
				foreground: '#000000',
				pdground: '#000000',
				showLoading: true,
				loadingText: '加载中...',
				loadMake: true,
				isBg: true,
			}
		},
		components:{
			HeaderBar
		},
		onLoad(options) {
			console.log(options)
			this.env = options.class
			this.getData()
		},
		methods: {
			getData(){
				this.uniRequest({
					url: 'download',
					method: 'GET'
				}).then(res => {
					this.address = res.result
					setTimeout(() => {
						this.$refs.qrcode._makeCode()
					}, 300)
				})
			},
			saveImage(){
				this.$refs.qrcode._saveCode()
			},
			copyAddress(){
				let { env, address } = this
				uni.setClipboardData({
				    data: env == 'ios'?address.ios_url:address.android_url,
				    success: function () {
				        uni.showToast({
							title: "复制成功"
						})
				    },
					fail: function() {
						uni.showToast({
							title: "保存失败，请稍后重试"
						});
					}
				});
			}
		},
		computed: {  
			i18n () {  
				return this.$t('index')  
			}  
		}
	}
</script>

<style lang="scss">
.download{
	min-height: calc(100vh - 128rpx);
	background-color: #051C3F;
	.container{
		padding: 70rpx 0 0;
		.mywallet-wrap{
			background: #FFFFFF;
			box-shadow: 0px -4rpx 120rpx 0px rgba(163, 163, 164, 0.1);
			text-align: center;
			border-radius: 64rpx 64rpx 0px 0px;
			height: calc(100vh - 198rpx);
			padding: 30rpx;
			box-sizing: border-box;
			.line{
				width: 76rpx;
				height: 10rpx;
				background: #2D2D2D;
				box-shadow: 0px -4rpx 120rpx 0px rgba(163, 163, 164, 0.1);
				border-radius: 200rpx;
				opacity: 0.2;
				margin: 0 auto;
			}
			.mywallet-title{
				padding-top: 64rpx;
				.top-img{
					width: 116rpx;
					height: 116rpx;
					display: block;
					margin: 0 auto 20rpx;
				}
				text{
					font-size: 24rpx;
					color: #8F92A1;
				}
			}
			.address{
				font-size: 28rpx;
				color: #2D2D2D;
				margin-top: 30rpx;
				padding: 0 40rpx;
				word-break: break-all;
			}
			.download-qr{
				margin-top: 40rpx;
			}
		}
		.btn-wrap{
			margin-top: 64rpx;
			.btn-item{
				height: 100rpx;
				line-height: 100rpx;
				border-radius: 16rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				text-align: center;
				margin-bottom: 20rpx;
				&.blue{
					background-color: #0F6EFF;
				}
				&.green{
					background-color: #00CC96;
				}
			}
		}
	}
}
</style>
