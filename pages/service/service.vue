<template>
	<view class="service">
		<header-bar :isBack="isBack" :isBlue="isBlue" :title="i18n.header.header10"></header-bar>
		<view class="service-bar">
			<view class="service-wrap">
				<view class="item" @tap="gotoPage('/pages/service/customer')">
					<image src="../../static/images/icon24.png"></image>
					<text>{{i18n.service.service1}}</text>
				</view>
				<view class="item" @tap="gotoPage(`/pages/my/newsdetail?type=0&title=${i18n.header.header11}`)">
					<image src="../../static/images/icon25.png"></image>
					<text>{{i18n.header.header11}}</text>
				</view>
				<view class="item" @tap="gotoPage(`/pages/my/newsdetail?type=1&title=${i18n.header.header12}`)">
					<image src="../../static/images/icon26.png"></image>
					<text>{{i18n.header.header12}}</text>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="vedio-title">
				<text>{{i18n.service.service2}}</text>
			</view>
			<view class="vedio">
				<video class="myvideo" :src="item.pic" v-for="(item, index) in videosList" :key="index"></video>
			</view>
			<view class="hr"></view>
			<view class="service-content">
				<view class="vedio-title mt0">
					<text>{{i18n.service.service3}}</text>
				</view>
				<scroll-view scroll-y="true" class="service-list">
					<view class="service-item" v-for="(item, index) in resourceList" :key="index">
						<view class="format" :class="'format'+item.type"></view>
						<view class="text">
							<text>{{item.title}}</text>
						</view>
						<!-- <view class="read">
							<text>{{i18n.service.lang43}}</text>
						</view> -->
						<view class="download" @tap="download(item.pic, index)"></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<tabbar :isCurrent="4"></tabbar>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue'
	import Tabbar from '../../components/tabbar.vue'
	export default {
		data() {
			return {
				isBack: false,
				isBlue: true,
				resourceList: [],
				videosList: [],
				hideArray: [],
			}
		},
		components: {
			HeaderBar,
			Tabbar
		},
		onLoad() {
			this.getResource()
			this.getVideos()
		},
		methods: {
			gotoPage(url){
				uni.navigateTo({
				    url
				});
			},
			getVideos(){
				this.uniRequest({
					url: 'videos',
					method: 'GET'
				}).then(res => {
					this.videosList = res.result
				})
			},
			getResource(){
				this.uniRequest({
					url: 'resource',
					data: {
						page: 1,
						limit: 10,
					}
				}).then(res => {
					this.resourceList = res.result.data
				})
			},
			download(url, index){
				plus.runtime.openURL(url, function(){
					uni.showToast({
						title: '下载文件失败',
						icon: 'none'
					})
				})
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
/* #ifdef H5 */
uni-page-body{
	padding-bottom: 100rpx;
}
/* #endif */
.service{
	min-height: calc(100vh - 228rpx);
	box-sizing: border-box;
	.service-bar{
		height: 220rpx;
		background-color: #0F6EFF;
		position: relative;
		.service-wrap{
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: absolute;
			top: 48rpx;
			left: 30rpx;
			right: 30rpx;
			height: 262rpx;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 24rpx 0px rgba(0, 0, 0, 0.11);
			border-radius: 24rpx;
			.item{
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				flex: 1;
				image{
					width: 100rpx;
					height: 100rpx;
				}
				text{
					font-size: 32rpx;
					color: #2D2D2D;
					margin-top: 14rpx;
				}
			}
		}
	}
	.container{
		.vedio-title{
			font-size: 30rpx;
			color: #2D2D2D;
			margin-top: 90rpx;
			&.mt0{
				margin-top: 0;
			}
			text{
				display: inline-block;
				&::after{
					content: "";
					display: block;
					height: 4rpx;
					background: #0F6EFF;
					border-radius: 2rpx;
					margin-top: 4rpx;
				}
			}
		}
		.vedio{
			margin-top: 20rpx;
			.myvideo{
				margin-bottom: 20rpx;
				&:last-child{
					margin-bottom: 0;
				}
			}
			uni-video{
				width: 100%;
				height: 360rpx;
			}
		}
		.hr{
			width: 750rpx;
			height: 10rpx;
			margin: 40rpx -30rpx;
			background-color: #F6F7FB;
		}
		.service-content{
			.service-title{
				width: 116rpx;
				height: 42rpx;
				position: relative;
				&::before{
					content: "";
					display: block;
					width: 70rpx;
					height: 6rpx;
					background: #59D0CF;
					position: absolute;
					bottom: -10rpx;
					left: 50%;
					margin-left: -35rpx;
				}
				image{
					width: 116rpx;
					height: 42rpx;
				}
			}
			.service-list{
				margin-top: 28rpx;
				max-height: calc(100vh - 762rpx);
				.service-item{
					height: 118rpx;
					border-radius: 8rpx;
					margin-bottom: 12rpx;
					padding: 0 60rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: #F6F7FB;
					&:last-child{
						margin-bottom: 0;
					}
					.format{
						width: 42rpx;
						height: 52rpx;
						margin-right: 16rpx;
						&.format1{
							background: url('../../static/images/icon28.png') no-repeat;
							background-size: contain;
						}
						&.format2{
							background: url('../../static/images/icon29.png') no-repeat;
							background-size: contain;
						}
						&.format3{
							background: url('../../static/images/icon30.png') no-repeat;
							background-size: contain;
						}
						&.format4{
							background: url('../../static/images/icon30_1.png') no-repeat;
							background-size: contain;
						}
						&.format5{
							background: url('../../static/images/icon30_2.png') no-repeat;
							background-size: contain;
						}
						&.format6{
							background: url('../../static/images/icon30_3.png') no-repeat;
							background-size: contain;
						}
					}
					.text{
						flex: 1;
						font-size: 28rpx;
						color: #2D2D2D;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space:nowrap;
					}
					.read{
						font-size: $fontJ;
						color: $colorF;
						margin: 0 20rpx;
					}
					.download{
						width: 28rpx;
						height: 28rpx;
						margin-left: 16rpx;
						background: url('../../static/images/icon31.png') no-repeat;
						background-size: contain;
					}
				}
			}
		}
	}
}
</style>
