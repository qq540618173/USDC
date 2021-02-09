<template>
	<view class="recharge">
		<header-bar :isBg="true"></header-bar>
		<view class="container">
			<picker class="picker" @change="bindPickerChange($event, walletList)" :value="index" :range-key="'coin'" :range="walletList">
				<view class="uni-input">{{walletList[index]?walletList[index].coin:''}}{{i18n.header.header3}}</view>
			</picker>
			<view class="invitation-wrap">
				<view class="invitation-qr">
					<image :src="rechargeData.img"></image>
				</view>
				<view class="link">
					<text>{{walletList[index]?walletList[index].coin:''}} {{i18n.index.lang15}}</text>
					<text>{{rechargeData.address}}</text>
				</view>
				<view class="btn-wrap">
					<view class="btn-item" @tap="saveImage">
						<image src="../../static/images/icon90.png" mode=""></image>
						<text>{{i18n.index.lang12}}</text>
					</view>
					<view class="btn-item" @tap="copyLink">
						<image src="../../static/images/icon91.png" mode=""></image>
						<text>{{i18n.index.lang13_2}}</text>
					</view>
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
				rechargeData: '',
				walletList: [],
				index: 0,
				choiseCoin: '',       //资产页跳过来的coin
			}
		},
		onLoad(options) {
			this.choiseCoin = options.coin
			this.getWalletList()
		},
		components:{
			HeaderBar
		},
		methods: {
			getData(id){
				this.uniRequest({
					url: 'deposit',
					method: 'GET',
					data: {
						coin_id: id,
					}
				}).then(res => {
					this.rechargeData = res.result
				})
			},
			getWalletList(){
				let { choiseCoin } = this
				this.uniRequest({
					url: 'walletInfo',
					method: 'GET'
				}).then(res => {
					this.walletList = res.result
					let cIndex = '', cItem = {}
					if(choiseCoin){
						res.result.filter((item, index) => {
							if(item.coin == choiseCoin){
								cIndex = index
								cItem = item
							}
						})
						this.index = cIndex
						this.getData(cItem.coin_id)
					}else{
						this.getData(res.result[0].coin_id)
					}
					
				})
			},
			bindPickerChange(e, v){
				this.index = e.target.value
				this.getData(v[e.target.value].coin_id)
			},
			saveImage(){
				let { rechargeData } = this
				uni.downloadFile({
					url: rechargeData.img,
					success: (res) =>{
						if (res.statusCode === 200){
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
						}
					}
				})
			},
			copyAddress(){
				let { rechargeData } = this
				uni.setClipboardData({
				    data: rechargeData.address,
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
.recharge{
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
