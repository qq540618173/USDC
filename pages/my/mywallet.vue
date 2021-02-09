<template>
	<view class="mywallet">
		<header-bar :isBg="true"></header-bar>
		<view class="container">
			<picker class="picker" @change="bindPickerChange($event, coinList)" :value="index" :range-key="'coin'" :range="coinList">
				<view class="uni-input">{{coinList[index]?coinList[index].coin:''}}{{i18n.my.lang58}}</view>
			</picker>
			<view class="mywallet-wrap">
				<view class="invitation-qr">
					<tki-qrcode
						ref="qrcode"
						:cid="cid"
						:val="coinList[index]?coinList[index].address:''"
						:size="size"
						:unit="unit"
						:background="background"
						:foreground="foreground"
						:pdground="pdground"
						:loadMake="loadMake"
						:showLoading="showLoading"
						:loadingText="loadingText"
						:onval="true"
					/>
				</view>
				<view class="link">
					<text>{{coinList[index]?coinList[index].address:''}}</text>
				</view>
				<view class="btn-wrap">
					<view class="btn-item" @tap="saveImage">
						<image src="../../static/images/icon90.png" mode=""></image>
						<text>{{i18n.index.lang12}}</text>
					</view>
					<view class="btn-item" @tap="copyAddress">
						<image src="../../static/images/icon91.png" mode=""></image>
						<text>{{i18n.my.lang59}}</text>
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
				coinList: [],
				index: 0,
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
		components:{
			HeaderBar,
			tkiQrcode
		},
		onLoad() {
			this.getCoin()
		},
		methods: {
			copyAddress(){
				let { coinList, index } = this
				uni.setClipboardData({
				    data: coinList[index].address,
				    success: function () {
				        uni.showToast({
							title: "复制成功",
							icon: "none"
						})
				    },
					fail: function() {
						uni.showToast({
							title: "保存失败，请稍后重试",
							icon: "none"
						});
					}
				});
			},
			saveImage(){
				this.$refs.qrcode._saveCode()
			},
			addClass(classname){
				this[classname] = !this[classname]
			},
			getCoin(){
				this.uniRequest({
					url: 'coin',
					method: 'GET'
				}).then(res => {
					this.coinList = res.result
				})
			},
			bindPickerChange(e, v){
				this.index = e.target.value
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
.mywallet{
	min-height: calc(100vh - 128rpx);
	background-color: #051C3F;
	.container{
		.picker{
			font-size: 34rpx;
			color: #FFFFFF;
			margin-bottom: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			&::after{
				content: "";
				display: block;
				border-top: 10rpx solid #DBE3ED;
				border-left: 10rpx solid transparent;
				border-right: 10rpx solid transparent;
				margin-left: 10rpx;
			}
		}
		.mywallet-title{
			font-size: 34rpx;
			color: #FFFFFF;
			text-align: center;
			margin-bottom: 30rpx;
		}
		.mywallet-wrap{
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
				padding: 0 50rpx;
				display: flex;
				flex-direction: column;
				margin-top: 40rpx;
				text{
					&:first-child{
						margin-bottom: 20rpx;
						font-size: 24rpx;
						color: #8F92A1;
					}
				}
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
