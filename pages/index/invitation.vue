<template>
	<view class="invitation">
		<header-bar :isBg="isBg" :title="i18n.header.header2"></header-bar>
		<view class="container">
			<view class="invitation-wrap">
				<view class="link">
					<text>{{currentUrl}}</text>
				</view>
				<view class="invitation-qr" v-if="currentUrl">
					<view class="qrimg">
					    <tki-qrcode
					    ref="qrcode"
					    :cid="cid"
					    :val="currentUrl"
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
					<view class="btn-item" @tap="saveImage">
						<image src="../../static/images/icon90.png" mode=""></image>
						<text>{{i18n.index.lang12}}</text>
					</view>
					<view class="btn-item" @tap="copyAddress">
						<image src="../../static/images/icon91.png" mode=""></image>
						<text>{{i18n.index.lang14}}</text>
					</view>
					<view class="btn-item" @tap="copyLink">
						<image src="../../static/images/icon91.png" mode=""></image>
						<text>{{i18n.index.lang13_1}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue';
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
	export default {
		data() {
			return {
				isBg: true,
				currentUrl: '',
				cid: "1",
				size: 320,
				unit: 'upx',
				background: '#ffffff',
				foreground: '#000000',
				pdground: '#000000',
				showLoading: true,
				loadingText: '加载中...',
				loadMake: true,
				invite: '',
			}
		},
		onLoad(){
			this.getImage()
		},
		components:{
			HeaderBar,
			tkiQrcode
		},
		methods: {
			getImage(){
				this.uniRequest({
					url: 'invite',
					method: 'GET'
				}).then(res => {
					this.currentUrl = res.result.url
					this.invite = res.result.invite
					setTimeout(() => {
						this.$refs.qrcode._makeCode()
					}, 300)
				})
			},
			saveImage(){
				this.$refs.qrcode._saveCode()
			},
			copyAddress(){
				let { invite } = this
				uni.setClipboardData({
				    data: invite,
				    success: function () {
				        uni.showToast({
							title: "复制成功",
						})
				    },
					fail: function() {
						uni.showToast({
							title: "保存失败，请稍后重试",
						});
					}
				});
			},
			copyLink(){
				let { currentUrl } = this
				uni.setClipboardData({
				    data: currentUrl,
				    success: function () {
				        uni.showToast({
							title: "复制成功",
						})
				    },
					fail: function() {
						uni.showToast({
							title: "保存失败，请稍后重试",
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
.invitation{
	min-height: calc(100vh - 128rpx);
	background-color: #051C3F;
	.container{
		.invitation-wrap{
			background-color: #FFFFFF;
			text-align: center;
			padding-top: 100rpx;
			box-shadow:0px 8rpx 8rpx 0px rgba(0,0,0,0.05);
			border-radius: 24rpx;
			overflow: hidden;
			.link{
				font-size: 28rpx;
				color: #2D2D2D;
				word-break: break-all;
				padding: 0 30rpx;
			}
			.invitation-qr{
				width: 320rpx;
				height: 320rpx;
				margin: 40rpx auto 0;
				padding: 20rpx;
				background-color: $colorA;
				image{
					width: 320rpx;
					height: 320rpx;
				}
			}
			.btn-wrap{
				margin-top: 140rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 40rpx 0;
				background-color: #F6F7FB;
				.btn-item{
					font-size: 24rpx;
					color: #9797A8;
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					border-right: 1px solid #D1D1E3;
					&:last-child{
						border: 0;
					}
					image{
						width: 24rpx;
						height: 24rpx;
						margin-right: 6rpx;
					}
				}
			}
			.btn-wrap2{
				margin-top: 30rpx;
				.btn-item{
					height: 92rpx;
					line-height: 92rpx;
					border-radius: 50rpx;
					font-size: $fontH;
					color: $colorA;
					text-align: center;
				}
			}
		}
	}
}
</style>
