<template>
	<view class="data">
		<header-bar :isBack="isBack" :title="i18n.tabbar.data"></header-bar>
		<view class="content">
			<view class="data-top">
				<view class="sub-title">
					<text>{{i18n.data.data6}}USDC</text>
					<text @tap="gotoPage(`asset?id=${USDC.coin_id}`)">{{i18n.data.dataText1}}</text>
				</view>
				<view class="mid">
					<text>{{USDC.capital}} USDC</text>
				</view>
				<view class="bot">
					<text>≈{{USDC.cost}}CNY</text>
				</view>
			</view>
			<view class="operation-wrap">
				<view class="operation-item" @tap="gotoPage('/pages/index/recharge')">
					<image src="../../static/images/icon5.png"></image>
					<view class="text1">{{i18n.index.lang1}}</view>
				</view>
				<view class="operation-item" @tap="gotoPage('/pages/index/withdrawal')">
					<image src="../../static/images/icon6.png"></image>
					<view class="text2">{{i18n.index.lang2}}</view>
				</view>
				<view class="operation-item" @tap="gotoPage('/pages/index/exchangeu')">
					<image src="../../static/images/icon7.png"></image>
					<view class="text3">{{i18n.index.lang3}}</view>
				</view>
			</view>
			<view class="data-bot">
				<view class="bot-title">
					<text>{{i18n.data.data7}}</text>
					<text @tap="intro">{{i18n.data.dataText4}}</text>
				</view>
				<view class="token-item" @tap="gotoPage(`datainfo?id=${item.coin_id}&coin=${item.coin}`)" v-for="(item, index) in dataList" :key="index">
					<view class="img">
						<image :src="item.pic"></image>
					</view>
					<view class="coin">
						<text>{{item.coin}}</text>
					</view>
					<view class="price">
						<text>{{item.capital}}</text>
						<text>¥{{item.cost}}</text>
					</view>
				</view>
			</view>
		</view>
		<tabbar :isCurrent="2"></tabbar>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue'
	import Tabbar from '../../components/tabbar.vue'
	export default {
		data() {
			return {
				isBack: false,
				dataList: [],
				USDC: {},
			}
		},
		components: {
			HeaderBar,
			Tabbar
		},
		onLoad() {
			this.getData()
		},
		onShow() {
			this.getData()
		},
		methods: {
			getData(){
				this.uniRequest({
					url: 'walletInfo',
					method: 'GET'
				}).then(res => {
					this.dataList = res.result
					this.USDC = res.result.filter(item => item.coin == 'USDC')[0]
				})
			},
			intro(){
				uni.showToast({
					title: '即将开放',
					icon: 'none'
				})
			},
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
/* #ifdef H5 */
uni-page-body{
	padding-bottom: 100rpx;
}
/* #endif */
.data{
	min-height: calc(100vh - 228rpx);
	box-sizing: border-box;
	background-color: #FFFFFF;
	.content {
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
		padding: 0 30rpx 30rpx;
		background-size: contain;
		.data-top{
			height: 272rpx;
			background: linear-gradient(136deg, #0F6EFF 0%, #2C7AF1 100%);
			border-radius: 16px;
			padding: 40rpx 30rpx;
			box-sizing: border-box;
			.sub-title{
				font-size: 24rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: space-between;
			}
			.mid{
				font-size: 48rpx;
				color: #FFFFFF;
				text-align: center;
				margin-top: 40rpx;
			}
			.bot{
				font-size: 24rpx;
				color: #FFFFFF;
				margin-top: 10rpx;
				text-align: center;
			}
		}
		.operation-wrap{
			display: flex;
			justify-content: space-between;
			border-bottom: 10rpx solid #F6F7FB;
			padding: 22rpx 70rpx;
			margin: 0 -30rpx;
			.operation-item{
				text-align: center;
				image{
					width: 120rpx;
					height: 120rpx;
					display: block;
				}
				view{
					font-size: 28rpx;
					color: #2D2D2D;
					font-weight: 500;
					margin-top: 20rpx;
				}
			}
			.gradient1{
				background:linear-gradient(135deg,rgba(4,190,217,1) 0%,rgba(98,34,225,1) 100%);
			}
			.gradient2{
				background:linear-gradient(135deg,rgba(135,189,250,1) 0%,rgba(140,47,238,1) 100%);
				margin: 0 20rpx;
			}
			.gradient3{
				background:linear-gradient(135deg,rgba(115,202,213,1) 0%,rgba(37,164,141,1) 100%);
			}
		}
		.data-bot{
			margin-top: 30rpx;
			.bot-title{
				font-size: 30rpx;
				color: #2D2D2D;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;
				text{
					&:first-child{
						&::after{
							content: "";
							display: block;
							width: 116rpx;
							height: 4rpx;
							background: #0F6EFF;
							border-radius: 2rpx;
							margin-top: 4rpx;
						}
					}
					&:last-child{
						font-size: 24rpx;
						color: #8F92A1;
					}
				}
			}
			.token-item{
				border-bottom: 1px solid #F4F4F7;
				padding: 30rpx 40rpx 30rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.img{
					width: 76rpx;
					height: 76rpx;
					border-radius: 40rpx;
					border: 1px solid #EFF0F4;
					overflow: hidden;
					image{
						width: 76rpx;
						height: 76rpx;
					}
				}
				.coin{
					flex: 1;
					font-size: 28rpx;
					color: #5F616C;
					margin-left: 36rpx;
				}
				.price{
					display: flex;
					flex-direction: column;
					text-align: right;
					text{
						&:first-child{
							font-size: 32rpx;
							color: #2D2D2D;
						}
						&:last-child{
							font-size: 24rpx;
							color: #8F92A1;
							margin-top: 4rpx;
						}
					}
				}
			}
		}
	}
}
</style>
