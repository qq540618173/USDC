<template>
	<view class="index">
		<header-bar :isBack="isBack" :isBlue="isBlue" :isSlot="isSlot" :title="i18n.header.header1">
			<view slot="text" class="news" @tap="gotoPage('/pages/my/newslist')"></view>
		</header-bar>
		<view class="index-top">
			<view class="h5">
				<text>{{i18n.index.w18}}</text>
			</view>
			<view class="h3">
				<text>{{topList.totalIncome?topList.totalIncome:'0.00'}} USDC</text>
			</view>
			<view class="bot-flex">
				<view>
					<text class="h5">{{i18n.index.w19}}</text>
					<text class="h6">{{topList.sfIncome?topList.sfIncome:'0.00'}} USDC</text>
				</view>
				<view>
					<text class="h5">{{i18n.index.w20}}</text>
					<text class="h6">{{topList.lbIncome?topList.lbIncome:'0.00'}} USDC</text>
				</view>
			</view>
		</view>
		<view class="btn-box-bg"></view>
		<view class="btn-box">
			<view class="btn-box-content">
				<view class="left" @tap="open(3)">
					<text>{{i18n.index.w21}}</text>
				</view>
				<view class="right" @tap="open(4)">
					<text>{{i18n.index.w22}}</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="reward-wrap">
				<view>
					<text>{{i18n.index.w23}}</text>
					<text>{{calc}}</text>
				</view>
				<view>
					<text>{{i18n.index.w24}}</text>
					<text>{{topList.ztIncome?topList.ztIncome:'0.00'}}</text>
				</view>
				<view>
					<text>{{i18n.index.w25}}</text>
					<text>{{topList.jtIncome?topList.jtIncome:'0.00'}}</text>
				</view>
				<view>
					<text>{{i18n.index.w26}}</text>
					<text>{{topList.tdIncome?topList.tdIncome:'0.00'}}</text>
				</view>
			</view>
			<view class="hr"></view>
			<!-- <view class="notice-wrap">
				<view class="notice">
					<view class="notice-box">
						<view class="uni-padding-wrap">
							<view class="page-section swiper">
								<view class="page-section-spacing">
									<swiper class="swiper" autoplay="autoplay" interval="3000" duration="500" circular="circular" vertical="vertical">
										<swiper-item v-for="(item, index) in noticeList" :key="index">
											<view class="swiper-item">
												<view class="notice-item" @tap="gotoPage(`/pages/my/newsdetail?id=${item.id}`)">{{item.title}}</view>
											</view>
										</swiper-item>
									</swiper>
								</view>
							</view>
						</view>
					</view>
					<view class="more" @tap="gotoPage('/pages/my/newslist')">
						<text>{{i18n.index.lang8_2}}>></text>
					</view>
				</view>
			</view> -->
			<view class="mine">
				<view class="mine-title">
					<view>
						<image src="../../static/images/icon89.png"></image>
						<text>{{i18n.index.lang6_2}}</text>
					</view>
					<view @tap="gotoPage('revenue')">
						<text>{{i18n.index.lang6_3}}</text>
					</view>
				</view>
				<view class="mine-details">
					<view class="left">
						<view class="top">{{i18n.index.lang9}}</view>
						<view class="mid">{{indexData.amount}}</view>
						<view class="bot">{{i18n.index.lang8}}：{{indexData.sub_pool}}</view>
					</view>
					<view class="right">
						<image v-if="indexData.amount <= 0" src="../../static/images/icon97.png"></image>
						<image v-if="indexData.amount > 0" src="../../static/images/icon98.gif"></image>
					</view>
				</view>
				<view class="mine-btn">
					<view @tap="open(1)">
						<image src="../../static/images/icon11.png"></image>
						<text>{{i18n.index.lang6}}</text>
					</view>
					<view @tap="open(2)">
						<image src="../../static/images/icon12.png"></image>
						<text>{{i18n.index.lang6_1}}</text>
					</view>
				</view>
			</view>
			
			<!-- <swiper class="swiper swiper1" autoplay="autoplay">
				<swiper-item v-for="(item, index) in slideList" :key="index">
					<image :src="item.pic" mode="scaleToFill"></image>
				</swiper-item>
			</swiper> -->
		</view>
		<tabbar :isCurrent="1" v-if="!openUp"></tabbar>
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
		<view class="modal-mask" :class="{current: current}" @tap="close"></view>
		<view class="modal" :class="{current: current}">
			<view class="modal-title" v-show="status == 1">{{i18n.index.w11}}</view>
			<view class="modal-title" v-show="status == 2">{{i18n.index.w12}}</view>
			<view class="modal-title" v-show="status == 3">{{i18n.revenue.revenue12}}</view>
			<view class="modal-title" v-show="status == 4">{{i18n.revenue.revenue13}}</view>
			<view class="form-item" v-if="status == 1">
				<input type="digit" v-model="submitData.amount" :placeholder="i18n.index.w6" />
			</view>
			<view class="form-item" v-if="status == 2">
				<input type="digit" v-model="submitData.amount" @input="inputChange" :placeholder="i18n.index.w7" />
			</view>
			<view class="form-item" v-if="status == 4">
				<input type="digit" v-model="submitData.amount" :placeholder="i18n.revenue.revenue14" />
			</view>
			<view class="form-item">
				<input type="text" v-model="submitData.paypass" :password="active" :placeholder="i18n.index.w8" />
				<view class="password" :class="{'active': !active}" @tap="addClass('active')"></view>
			</view>
			<view v-if="status == 2">
				<view class="tips">
					<text>{{i18n.index.w14}}：{{indexData.amount}} usdc</text>
					<text class="blue" @tap="gotoPage('report')">{{i18n.index.w16}}</text>
				</view>
				<view class="tips">
					<text>{{i18n.index.w17}}：{{indexData.record}} usdc</text>
				</view>
				<view class="tips red">
					<text>{{i18n.index.w15}}</text>
				</view>
			</view>
			<view class="sure bggreen mt50" @tap="sureConfirm" v-show="status == 1">
				<text>{{i18n.index.w9}}</text>
			</view>
			<view class="sure bgblue mt50" @tap="sureConfirm(1)" v-show="status == 2">
				<text>{{i18n.index.w13}}</text>
			</view>
			<view class="sure bggreen" @tap="sureConfirm(2)" v-show="status == 2">
				<text>{{i18n.index.w10}}</text>
			</view>
			<view class="sure bggreen mt40" @tap="sureConfirm2" v-show="status == 3 || status == 4">
				<text>{{i18n.revenue.revenue16}}</text>
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
				title: '',
				timer: '',
				isBack: false,
				isBlue: true,
				isSlot: true,
				indexData: {},  //总数据
				noticeList: [], //公告列表
				slideList: [],
				versions: '',    //版本信息
				downloadurl: '', //下载地址
				env: 'android',
				openUp: false,
				current: false,
				active: true,
				status: 1,      // 1:马上挖矿  2:出仓  3:复投  4:加仓
				submitData: {},
				topList: {},
			}
		},
		components: {
			HeaderBar,
			Tabbar
		},
		onLoad() {
			this.getData()
			this.getNotice()
			this.getTopData()
			// this.getSlideData()
		},
		onShow() {
			this.getData()
			this.update()
		},
		methods: {
			getData(){
				// 获取首页信息
				this.uniRequest({
					url: 'wallet',
					method: 'GET'
				}).then(res => {
					this.indexData = res.result
				})
			},
			inputChange(e){
				let { indexData } = this
				if(e.detail.value >= indexData.amount){
					uni.showToast({
						title: '建议预留500U-1000U保留账户收益',
						icon: 'none'
					})
				}
			},
			getNotice(){
				// 获取首页公告
				this.uniRequest({
					url: 'notice',
					data: {
						page: 1,
						limit: 5
					}
				}).then(res => {
					this.noticeList = res.result.data
				})
			},
			sureConfirm(oType){
				// oType: 1.报备出仓  2.强制出仓
				// status: 1.挖矿   2.出仓
				let { status, submitData } = this
				if( status == 1 ){
					//流动性挖矿
					this.uniRequest({
						url: 'lucky',
						data: {
							...submitData,
							type: 1,
						}
					}).then(res => {
						uni.showToast({
							title: '挖矿成功',
							icon: 'none',
							success: () => {
								this.close()
							}
						})
					})
				}
				if( status == 2 ){
					//出仓
					this.uniRequest({
						url: 'storage',
						data: {
							...submitData,
							type: oType,
						}
					}).then(res => {
						uni.showToast({
							title: '出仓成功',
							icon: 'none',
							success: () => {
								this.close()
							}
						})
					})
				}
				setTimeout(()=>{
					this.getData()
				}, 300)
			},
			sureConfirm2(){
				let { status, submitData, topList } = this
				this.uniRequest({
					url: 'lucky',
					data: {
						id: topList.id,
						type: status-1,
						...submitData,
					}
				}).then(res => {
					let tips = status==2?'复投成功':'加仓成功'
					uni.showToast({
						title: tips,
						icon: 'none',
						success: () => {
							this.close()
						}
					})
					setTimeout(() => {
						this.getTopData()
					}, 300)
				})
			},
			open(status){
				this.current = true
				this.status = status
			},
			close(){
				this.current = false
				this.submitData = {}
			},
			addClass(classname){
				this[classname] = !this[classname]
			},
			gotoPage(url){
				uni.navigateTo({
				    url
				});
			},
			getTopData(){
				this.uniRequest({
					url: 'incomeNew',
					method: 'GET'
				}).then(res => {
					this.topList = res.result
				})
			},
			getSlideData(){
				this.uniRequest({
					url: 'slideshow',
					method: 'GET'
				}).then(res => {
					this.slideList = res.result
				})
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
			},
			calc () {
				let { topList } = this
				return topList.ztIncome && topList.jtIncome && topList.tdIncome?(Number(topList.ztIncome) + Number(topList.jtIncome) + Number(topList.tdIncome)).toFixed(2):'0.00'
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
.index{
	min-height: calc(100vh - 228rpx);
	box-sizing: border-box;
	.news{
		width: 36rpx;
		height: 36rpx;
		background: url(../../static/images/icon103.png) no-repeat;
		background-size: contain;
		position: relative;
		&::after{
			content: "";
			display: block;
			width: 12rpx;
			height: 12rpx;
			background-color: #FF0000;
			border-radius: 50%;
			position: absolute;
			right: 0rpx;
			top: 0rpx;
		}
	}
	.update{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #191D26;
		z-index: 991;
		display: flex;
		align-items: center;
		justify-content: center;
		.versioninfo{
			width: 640rpx;
			height: 816rpx;
			background: url(../../static/images/v.png) no-repeat;
			background-size: contain;
			.version-title{
				font-size: 48rpx;
				color: #FFFFFF;
				padding-top: 80rpx;
				padding-left: 110rpx;
			}
			.version-con{
				font-size: 48rpx;
				color: #000000;
				text-align: center;
				margin-top: 180rpx;
			}
			.version-btn{
				width: 440rpx;
				height: 92rpx;
				line-height: 92rpx;
				background: linear-gradient(135deg, #5D9FFD 0%, #57F0FC 100%);
				border-radius: 8rpx;
				text-align: center;
				font-size: 32rpx;
				color: #FFFFFF;
				margin: 228rpx auto 0;
			}
		}
	}
	.index-top{
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #0F6EFF;
		padding: 40rpx 0 20rpx;
		.h6{
			font-size: 30rpx;
			color: #FFFFFF;
			margin-top: 10rpx;
		}
		.h5{
			font-size: 28rpx;
			color: #AACCFF;
		}
		.h3{
			font-size: 52rpx;
			color: #FFFFFF;
			margin-top: 20rpx;
		}
		.bot-flex{
			margin-top: 60rpx;
			display: flex;
			width: 100%;
			>view{
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}
	}
	.btn-box-bg{
		height: 100rpx;
		background-color: #0F6EFF;
		border-radius: 0 0 300% 300%;
	}
	.btn-box{
		position: relative;
		height: 60rpx;
		.btn-box-content{
			height: 120rpx;
			position: absolute;
			top: -80rpx;
			left: 30rpx;
			right: 30rpx;
			display: flex;
			background: #FFFFFF;
			box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.11);
			border-radius: 16rpx;
			overflow: hidden;
			>view{
				height: 120rpx;
				line-height: 120rpx;
				text-align: center;
				font-size: 32rpx;
				flex: 1;
			}
			.left{
				color: #01DAB2;
			}
			.right{
				color: #FFFFFF;
				background: #00CC96 linear-gradient(180deg, #00E8C7 0%, #01C390 100%);
			}
		}
	}
	.content {
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
		padding: 0 30rpx 30rpx;
		// background: #292F42 url('../../static/images/bot.png') center top no-repeat;
		background-size: contain;
		.reward-wrap{
			padding: 30rpx 0 20rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			>view{
				width: 334rpx;
				height: 128rpx;
				border-radius: 8rpx;
				background-color: #F7F8F9;
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text{
					&:first-child{
						font-size: 24rpx;
						color: #8F92A1;
					}
					&:last-child{
						font-size: 32rpx;
						color: #2D2D2D;
						margin-top: 10rpx;
					}
				}
			}
		}
		.swiper1{
			margin-top: 40rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.swiper-con{
			margin-top: 28rpx;
			border-radius: 16rpx;
			padding: 30rpx 30rpx 0;
			background: linear-gradient(136deg, #0F6EFF 0%, #2C7AF1 100%);
			border-radius: 16px;
			box-shadow: 0 10rpx 20rpx #1A73FA;
			&.bg1{
				background: url(../../static/images/swiper.png) no-repeat;
				background-size: cover;
			}
			.swiper-item{
				.swiper-top{
					font-size: 24rpx;
					color: #FFFFFF;
				}
				.swiper-bot{
					color: #FFFFFF;
					text-align: center;
					margin-top: 50rpx;
					.big{
						font-size: 64rpx;
					}
					.small{
						font-size: 42rpx;
					}
				}
			}
		}
		.header-data{
			font-size: 48rpx;
			color: #FFFFFF;
			display: flex;
			padding-top: 40rpx;
			.icon{
				flex: 1;
				.name{
					font-size: 32rpx;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					.picUSDT{
						width: 72rpx;
						height: 72rpx;
						background: url(../../static/images/icon68.png) no-repeat;
						background-size: contain;
						margin-right: 20rpx;
					}
					.picSLOT{
						width: 72rpx;
						height: 72rpx;
						background: url(../../static/images/icon69.png) no-repeat;
						background-size: contain;
						margin-right: 20rpx;
					}
				}
				.num{
					font-size: 36rpx;
					color: #59D0CF;
					margin-top: 20rpx;
				}
			}
		}
		.notice-wrap{
			height: 80rpx;
			box-sizing: border-box;
			padding: 20rpx;
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;
			.qrcode{
				width: 212rpx;
				height: 96rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 8rpx;
				background-color: #292F42;
				.qrbox{
					width: 60rpx;
					height: 60rpx;
					margin-right: 12rpx;
					image{
						width: 60rpx;
						height: 60rpx;
					}
				}
				text{
					color: #C4C4C9;
					font-size: 32rpx;
				}
			}
		}
		.notice{
			width: 100%;
			padding-left: 56rpx;
			box-sizing: border-box;
			background: url('../../static/images/icon8.png') 4rpx 8rpx no-repeat;
			background-size: 32rpx 28rpx;
			position: relative;
			display: flex;
			align-items: center;
		}
		.notice-box{
			height: 68rpx;
			overflow: hidden;
			flex: 1;
			uni-swiper{
				height: 68rpx;
				.notice-item{
					height: 68rpx;
					font-size: 26rpx;
					color: #2D2D2D;
					display: flex;
					align-items: center;
				}
			}
		}
		.more{
			font-size: 24rpx;
			color: #8F92A1;
			padding-left: 10rpx;
		}
		.hr{
			height: 10rpx;
			margin: 0 -30rpx;
			background-color: #F6F7FB;
		}
		.mine{
			margin-top: 30rpx;
			.mine-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				view{
					&:first-child{
						font-size: 30rpx;
						color: #2D2D2D;
						display: flex;
						align-items: center;
						image{
							width: 68rpx;
							height: 68rpx;
							margin-right: 14rpx;
						}
					}
					&:last-child{
						font-size: 24rpx;
						color: #8F92A1;
					}
				}
			}
			.mine-details{
				margin-top: 20rpx;
				height: 320rpx;
				padding: 52rpx 30rpx 34rpx 60rpx;
				background: #FFF0CA;
				border-radius: 16rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				.left{
					.top{
						font-size: 26rpx;
						color: #8B430A;
					}
					.mid{
						font-size: 40rpx;
						color: #FF2C21;
						margin: 10rpx 0 30rpx;
					}
					.bot{
						font-size: 26rpx;
						color: #877D61;
					}
				}
				.right{
					width: 320rpx;
					height: 240rpx;
					image{
						width: 320rpx;
						height: 240rpx;
					}
				}
			}
			.mine-btn{
				margin-top: 40rpx;
				>view{
					height: 88rpx;
					border-radius: 50rpx;
					margin-bottom: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30rpx;
					color: #FFFFFF;
					&:first-child{
						background: linear-gradient(180deg, #3A88FF 0%, #0F31FF 100%);
					}
					&:last-child{
						border: 4rpx solid #3176FF;
						color: #3176FF;
						box-sizing: border-box;
					}
					image{
						width: 32rpx;
						height: 32rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
	.modal-mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.45);
		z-index: 8;
		display: none;
		&.current{
			display: block;
		}
	}
	.modal{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		background-color: #051C3F;
		border-radius: 24rpx 24rpx 0 0;
		padding: 36rpx 30rpx 50rpx;
		transform: translateY(100%);
		transition: 0.5s all;
		&.current{
			transform: translateY(-100rpx);
		}
		.modal-title{
			width: 158rpx;
			height: 42rpx;
			// background: url(../../static/images/icon59.png) no-repeat;
			// background-size: contain;
			font-size: 28rpx;
			color: #FFFFFF;
			text-align: center;
			margin: 0 auto 40rpx;
		}
		.form-item{
			uni-input{
				background: #13294A;
				border-radius: 12px;
				border: 1px solid rgba(255, 255, 255, 0.1);
				color: #FFFFFF;
			}
		}
		.sure{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 16rpx;
			text-align: center;
			color: #FFFFFF;
			margin-top: 20rpx;
			&.bggreen{
				background: #00CC96;
			}
			&.bgblue{
				background: #0F6EFF;
			}
			&.mt50{
				margin-top: 50rpx;
			}
		}
		.tips{
			font-size: 24rpx;
			color: #4C5D76;
			margin-bottom: 16rpx;
			padding-left: 30rpx;
			display: flex;
			justify-content: space-between;
			.blue{
				color: #0F6EFF;
			}
			&.red{
				color: #FF5023;
			}
		}
		.assets{
			font-size: 28rpx;
			color: #FFFFFF;
			margin-top: 24rpx;
			margin-left: 20rpx;
		}
	}
}
</style>
