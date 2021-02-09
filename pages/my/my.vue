<template>
	<view class="my">
		<header-bar :isBack="isBack" :isGary="isGary" :title="i18n.tabbar.my"></header-bar>
		<view class="content" :class="{'top': i18n.lang}">
			<view class="userinfo">
				<view class="head-image">
					<image :src="logoUrl"></image>
				</view>
				<view class="head-right">
					<view class="phone">
						<text>{{userInfo.username.replace(/(\w{3})\w*(\w{4})/, '$1****$2')}}</text>
					</view>
					<!-- <view class="name">
						<view class="txt">
							<text>{{userInfo.address}}</text>
						</view>
						<view class="btn" @tap="copyAddress">
							<text>{{i18n.my.lang59}}</text>
						</view>
					</view> -->
					<view class="authentication">
						<text class="blue" v-if="userStatus.activate == 1">{{i18n.my.lang106}}</text>
						<text class="red" v-if="userStatus.activate != 1">{{i18n.my.lang107}}</text>
					</view>
				</view>
			</view>
			<view class="operation-top-wrap">
				<view class="operation-top-title">
					<text>{{i18n.my.lang105}}</text>
				</view>
				<view class="operation-top-box">
					<view class="operation-item" @tap="gotoPage(`choice?type=1&title=${i18n.my.lang72+i18n.header.header13}`)">
						<image mode="heightFix" src="../../static/images/icon33.png"></image>
						<text>{{i18n.header.header13}}</text>
					</view>
					<view class="operation-item" @tap="gotoPage(`choice?type=2&title=${i18n.my.lang72+i18n.header.header14}`)">
						<image mode="heightFix" src="../../static/images/icon34.png"></image>
						<text>{{i18n.header.header14}}</text>
					</view>
					<view class="operation-item" @tap="gotoPage(`modify?type=3&title=${i18n.my.lang72+i18n.header.header15}`)">
						<image mode="heightFix" src="../../static/images/icon35.png"></image>
						<text>{{i18n.header.header15}}</text>
					</view>
					<!-- <view class="operation-item" @tap="gotoPage('accounts')">
						<image mode="heightFix" src="../../static/images/icon42.png"></image>
						<text>{{i18n.header.header22}}</text>
					</view> -->
				</view>
			</view>
			<view class="operation-bot-wrap">
				<!-- <view class="operation-item" @tap="gotoPage('newslist')">
					<image src="../../static/images/icon38.png"></image>
					<text>{{i18n.header.header18}}</text>
				</view> -->
				<view class="operation-item" @tap="gotoPage('/pages/index/invitation')">
					<image src="../../static/images/icon39.png"></image>
					<text>{{i18n.header.header19}}</text>
				</view>
				<view class="operation-item" @tap="gotoPage('proposal')">
					<image src="../../static/images/icon37.png"></image>
					<text>{{i18n.header.header17}}</text>
				</view>
				<view class="operation-item" @tap="gotoPage('feedbacklist')">
					<image src="../../static/images/icon85.png"></image>
					<text>{{i18n.header.header17_1}}</text>
				</view>
				<view class="operation-item" @tap="showLanguage">
					<image src="../../static/images/icon36.png"></image>
					<text>{{i18n.header.header16}}</text>
				</view>
				<view class="operation-item" @tap="gotoPage('team')">
					<image src="../../static/images/icon43.png"></image>
					<text>{{i18n.header.header23}}</text>
				</view>
				<view class="operation-item" @tap="gotoPage('authentication')">
					<image src="../../static/images/icon54.png"></image>
					<text>{{i18n.header.header27}}</text>
				</view>
				<view class="operation-item" @tap="gotoPage('mywallet')">
					<image src="../../static/images/icon41.png"></image>
					<text>{{i18n.header.header21}}</text>
				</view>
				<view class="operation-item" @tap="update">
					<image class="pic10" src="../../static/images/icon40.png"></image>
					<text>{{i18n.header.header31}}</text>
					<text style="flex: 1; text-align: right; padding-right: 60rpx;">{{versionNum}}</text>
				</view>
				<view class="operation-item" @tap="gotoPage('class')">
					<image src="../../static/images/icon40.png"></image>
					<text>{{i18n.header.header20}}</text>
				</view>
				<view class="operation-item" @tap="gotoPage('/pages/index/recharge')">
					<image src="../../static/images/icon95.png"></image>
					<text>{{i18n.header.header33}}</text>
				</view>
				<view class="operation-item" @tap="openBrowser(urlArr.originUrl)">
					<image src="../../static/images/icon96.png"></image>
					<text>{{i18n.header.header34}}</text>
				</view>
			</view>
			<view class="operation-btn blue" @tap="logOut">
				<text>{{i18n.my.lang48}}</text>
			</view>
			<view class="operation-btn gary" @tap="logOut">
				<text>{{i18n.my.lang49}}</text>
			</view>
		</view>
		<tabbar :isCurrent="5"></tabbar>
		<view class="mask" v-if="modalActive"></view>
		<view class="modal" :class="{'active': modalActive}">
			<view class="language-item" @tap="changeLanguage('zh_CN')">
				<text>简体中文</text>
			</view>
			<view class="language-item" @tap="changeLanguage('zh_TC')">
				<text>繁體中文</text>
			</view>
			<view class="language-item" @tap="changeLanguage('en_US')">
				<text>English</text>
			</view>
			<view class="language-item" @tap="changeLanguage('jp_JPN')">
				<text>日本語</text>
			</view>
			<view class="language-item" @tap="changeLanguage('kr_Kr')">
				<text>한국어.</text>
			</view>
			<view class="language-cancel" @tap="cancelLanguage">
				<text>取消</text>
			</view>
		</view>
		<view class="update" v-if="openUp">
			<view class="versioninfo">
				<view class="version-title">
					<text>{{i18n.index.w3}}{{versions}}</text>
				</view>
				<view class="version-con">
					<text>{{i18n.index.w4}}</text>
				</view>
				<view class="version-btn" @tap="doUpData">
					<text>{{i18n.index.w5}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue'
	import Tabbar from '../../components/tabbar.vue'
	export default {
		data() {
			return {
				timer: '',
				isBack: false,    //头部返回按钮
				isGary: true,
				modalActive: false,    //modal弹出
				userInfo: '',
				versions: '',    //版本信息
				downloadurl: '', //下载地址
				env: 'android',
				openUp: false,
				urlArr: {},
				userStatus: {},
				versionNum: '',
				logoUrl: '',
			}
		},
		components: {
			HeaderBar,
			Tabbar
		},
		onLoad() {
			let userInfo = uni.getStorageSync('userInfo')
			if(userInfo){
				this.userInfo = userInfo
			} else {
				uni.showToast({
					title: '请重新登录',
					icon: 'none',
					success: () => {
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}, 1000)
					}
				})
			}
			this.getUrl()
			this.getLogo()
			this.getUserInfo()
			this.getVersion()
		},
		methods: {
			gotoPage(url){
				uni.navigateTo({
				    url
				});
			},
			showLanguage(){
				this.modalActive = true
			},
			changeLanguage(language){
				const system_info = uni.getStorageSync('system_info')
				system_info.language = this._i18n.locale = language
				uni.setStorageSync('system_info',system_info)
				this.modalActive = false
			},
			moveHandle(){
				//禁止页面滚动
				if(this.modalActive){
					return
				}
			},
			cancelLanguage(){
				this.modalActive = false
			},
			getLogo(){
				this.uniRequest({
					url: 'logo',
					method: 'GET'
				}).then(res => {
					this.logoUrl = res.result.pic
				})
			},
			logOut(){
				// 退出登录
				this.uniRequest({
					url: 'logOut',
					method: 'GET'
				}).then(res => {
					uni.reLaunch({
						url: '/pages/login/login'
					})
				})
			},
			getUserInfo(){
				this.uniRequest({
					url: 'userInfo',
					method: 'GET'
				}).then(res => {
					this.userStatus = res.result
				})
			},
			getVersion(){
				let _That = this
				plus.runtime.getProperty(plus.runtime.appid, function(inf) {
					_That.versionNum = inf.version
				});
			},
			getUrl(){
				this.uniRequest({
					url: 'blockUrl',
					method: 'GET'
				}).then(res => {
					this.urlArr = res.result
				})
			},
			openBrowser(url){
				plus.runtime.openURL(url)
			},
			copyAddress(){
				let { address } = this.userInfo
				uni.setClipboardData({
				    data: address,
				    success: function () {
				        uni.showToast({
							title: "复制成功",
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
			update() {
				let env = this.env
				let versions = ''
				let downloadurl = ''
				let _this = this
				this.uniRequest({
					url: 'download',
					method: 'GET'
				}).then(res => {
					if(env == 'android'){
						versions = res.result.android_version
						downloadurl = res.result.android_url
					}else{
						versions = res.result.ios_version
						downloadurl = res.result.ios_url
					}
					this.versions = versions
					this.downloadurl = downloadurl
					plus.runtime.getProperty(plus.runtime.appid, function(inf) {
						if(inf.version != versions){
							_this.openUp = true
						}else{
							uni.showToast({
								title: '当前已是最新版本',
								icon: 'none'
							})
						}
					});
				})
			},
			doUpData() {
				let url = this.downloadurl
			    uni.showLoading({
			        title: '更新中……'
			    })
			    uni.downloadFile({
					//执行下载
			        url, //下载地址
			        success: downloadResult => {//下载成功
			            uni.hideLoading();
			            if (downloadResult.statusCode == 200) {
			                uni.showModal({
			                    title: '',
			                    content: '更新成功，确定现在重启吗？',
			                    confirmText: '重启',
			                    confirmColor: '#EE8F57',
			                    success: function(res) {
			                        if (res.confirm == true) {
			                            plus.runtime.install(//安装
			                                downloadResult.tempFilePath, {
			                                    force: true
			                                },
			                                function(res) {
			                                    utils.showToast('更新成功，重启中');
			                                    plus.runtime.restart();
			                                }
			                            );
			                        }
			                    }
			                });
			            }
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
/* #ifdef H5 */
uni-page-body{
	padding-bottom: 100rpx;
}
/* #endif */
.my{
	min-height: calc(100vh - 228rpx);
	box-sizing: border-box;
	background-color: #FFFFFF;
	.content {
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
		padding-bottom: 30rpx;
		background: #F6F7FB;
		&.top{
			.operation-list-wrap{
				height: auto;
				padding-bottom: 30rpx;
				.operation-box{
					align-items: flex-start;
				}
			}
		}
		.userinfo{
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
			padding: 0 30rpx;
			.head-image{
				width: 124rpx;
				height: 124rpx;
				margin-right: 26rpx;
				image{
					width: 124rpx;
					height: 124rpx;
					border-radius: 50%;
				}
			}
			.head-right{
				flex: 1;
				.phone{
					font-size: 28rpx;
					color: #2D2D2D;
					font-weight: 400;
				}
				.name{
					font-size: 24rpx;
					color: #8F92A1;
					margin-top: 10rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.txt{
						overflow: hidden;
						height: 40rpx;
						line-height: 40rpx;
						word-break: break-all;
						padding-right: 20rpx;
					}
					.btn{
						font-size: $fontJ;
						color: #0F6EFF;
						flex-shrink: 0;
					}
				}
				.authentication{
					margin-top: 8rpx;
					text{
						display: inline-block;
						font-size: 24rpx;
						border-radius: 8rpx;
						color: #FFFFFF;
						padding: 4rpx 8rpx;
						background-color: #E60D0D;
						&.red{
							background-color: #E60D0D;
						}
						&.blue{
							background-color: #0F6EFF;
						}
					}
				}
			}
		}
		.operation-top-wrap{
			background-color: #FFFFFF;
			padding: 20rpx 0 40rpx;
			.operation-top-title{
				font-size: 24rpx;
				color: #2D2D2D;
				margin-bottom: 26rpx;
				padding: 0 30rpx;
			}
			.operation-top-box{
				display: flex;
				justify-content: center;
				align-items: center;
				.operation-item{
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					image{
						height: 48rpx;
					}
					text{
						font-size: 20rpx;
						color: #8F92A1;
						margin-top: 10rpx;
					}
				}
			}
		}
		
		.operation-bot-wrap{
			margin-top: 28rpx;
			margin-bottom: 24rpx;
			padding: 20rpx 20rpx 20rpx 30rpx;
			background-color: #FFFFFF;
			.operation-item{
				height: 100rpx;
				line-height: 100rpx;
				display: flex;
				align-items: center;
				position: relative;
				&::before{
					content: "";
					display: block;
					width: 40rpx;
					height: 40rpx;
					background: url(../../static/images/icon66.png) no-repeat;
					background-size: contain;
					position: absolute;
					right: 0;
					top: 50%;
					margin-top: -20rpx;
				}
				image{
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
				text{
					font-size: 26rpx;
					color: #2D2D2D;
				}
			}
		}
		.operation-btn{
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 8rpx;
			text-align: center;
			background-color: #FFFFFF;
			font-size: 28rpx;
			margin-bottom: 24rpx;
			&.blue{
				color: #0F6EFF;
			}
			&.gary{
				color: #2D2D2D;
				margin-bottom: 0;
			}
		}
	}
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0, .4);
		z-index: 998;
	}
	.modal{
		width: 100vw;
		padding-top: 46rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 100rpx;
		z-index: 999;
		box-shadow: 0 0 20rpx #000000;
		transform: translateY(200%);
		transition: all 0.5s;
		&.active{
			display: block;
			transform: translateY(0);
			transition: all 0.5s;
		}
		.language-item{
			height: 114rpx;
			line-height: 114rpx;
			text-align: center;
			font-size: 28rpx;
			color: #5F616C;
			margin-bottom: 20rpx;
			border-bottom: 1px solid #F6F6F6;
			&:last-child{
				margin-bottom: 0;
			}
		}
		.language-cancel{
			height: 114rpx;
			line-height: 114rpx;
			text-align: center;
			font-size: 28rpx;
			color: #5F616C;
			margin-top: 30rpx;
		}
	}
}
</style>
