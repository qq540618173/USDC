<template>
	<view class="datainfo">
		<header-bar :isGary="isGary" :isBack="isBack" :title="coin"></header-bar>
		<view class="content">
			<view class="top-price">
				<text>{{indexData.amount}}</text>
				<text>≈{{indexData.cost}}CNY</text>
			</view>
			<view class="charts-wrap">
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
			</view>
			<view class="tab-content">
				<view class="tab-title">
					<view class="tab-title-item" :class="{'actice': state == 0}" @tap="tab(0)">
						<text>{{i18n.data.data8}}</text>
					</view>
					<view class="tab-title-item" :class="{'actice': state == 1}" @tap="tab(1)">
						<text>{{i18n.data.data9}}</text>
					</view>
					<view class="tab-title-item" :class="{'actice': state == 2}" @tap="tab(2)">
						<text>{{i18n.data.data10}}</text>
					</view>
				</view>
				<view class="tab-con">
					<view class="tab-con-list" v-for="(item, index) in dataList" :key="index">
						<view class="info">
							<text v-if="item.is_me == 0 && item.type != 2">{{i18n.history['history'+item.type]}}</text>
							<text v-if="item.is_me == 0 && item.type == 2">{{item.remark}}</text>
							<text v-if="item.is_me == 1">{{i18n.history.history3 + item.remark}}</text>
							<text v-if="item.is_me == 2">{{i18n.history.history3_1 + item.remark + i18n.history.history3_2}}</text>
							<text>{{item.create_time}}</text>
						</view>
						<view class="price">
							<text class="green" v-if="item.state == 0">+{{item.amount}}</text>
							<text class="red" v-if="item.state == 1">-{{item.amount}}</text>
							<text>{{i18n.history.history16}} {{item.balance}}</text>
						</view>
					</view>
					<view class="nodata" v-if="dataList.length == 0">
						<text>{{i18n.history.history17}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bot-fixed">
			<view class="btn-box default" @tap="gotoPage(`/pages/index/exchangeu?coin=${indexData.coin}`)">
				<text>{{i18n.data.data11}}</text>
			</view>
			<view class="btn-box green" @tap="gotoPage(`/pages/index/recharge?coin=${indexData.coin}`)">
				<text>{{i18n.data.data12}}</text>
			</view>
			<view class="btn-box blue" @tap="gotoPage(`/pages/index/withdrawal?coin=${indexData.coin}`, 2)">
				<text>{{i18n.index.lang2}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue'
	import Tabbar from '../../components/tabbar.vue'
	import uCharts from '../../components/u-charts.min'

	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				isGary: true,
				isBack: true,
				dataList: [],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				chartData: {
					categories: [],
					series: []
				},
				state: 0,
				indexData: {},
				coinId: '',
			}
		},
		components: {
			HeaderBar,
			Tabbar
		},
		onLoad(options) {
			_self = this;
			this.coin = options.coin
			this.coinId = options.id
			this.getData()
			this.getCoinInfo(options.id, options.coin)
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
		},
		methods: {
			getData() {
				this.uniRequest({
					url: 'accountLogs',
					method: 'GET',
					data: {
						coin_id: this.coinId,
						state: this.state
					}
				}).then(res => {
					this.indexData = res.result
					this.dataList = res.result.list
				})
			},
			getCoinInfo(id, coin) {
				this.uniRequest({
					url: 'marketCoinInfo',
					method: 'GET',
					data: {
						coin_id: id
					}
				}).then(res => {
					this.chartData = {
						categories: res.result.date,
						series: [{
							name: coin,
							data: res.result.price,
						}]
					}
					this.showLineA("canvasLineA", this.chartData)
				})
			},
			tab(state){
				this.state = state
				this.getData()
			},
			gotoPage(url, state) {
				let { indexData } = this
				if(state == 2){
					if(indexData.coin != 'USDC' && indexData.coin != 'USDT'){
						uni.showToast({
							title: '暂未开放',
							icon: 'none'
						})
						return
					}
				}
				console.log(url)
				uni.navigateTo({
					url
				});
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'area',
					fontSize:11,
					legend:{show:true},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:1,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
					},
					yAxis: {
						gridType:'dash',
					},
					width: this.cWidth,
					height: this.cHeight,
					extra: {
						area:{
							type: 'straight',
							opacity:0.2,
							addLine:true,
							width:2
						}
					}
				});
			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		}
	}
</script>

<style lang="scss">
	uni-page-body{
		padding-bottom: 100rpx;
	}
	.datainfo {
		min-height: calc(100vh - 228rpx);
		.content {
			width: 100%;
			min-height: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			background-color: #F6F7FB;

			.top-price {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-bottom: 30rpx;

				text {
					&:first-child {
						font-size: 60rpx;
						color: #2D2D2D;
					}

					&:last-child {
						font-size: 24rpx;
						color: #8F92A1;
					}
				}
			}

			.charts-wrap {
				overflow: hidden;
				position: relative;
				margin: 0 -30rpx;
				width: 750rpx;

				.qiun-charts {
					width: 750upx;
					height: 500upx;
					background-color: #FFFFFF;
				}

				.charts {
					width: 750upx;
					height: 500upx;
					background-color: #FFFFFF;
					border-radius: 0 0 8rpx 8rpx;
				}
			}

			.tab-content {
				margin: 20rpx -30rpx 0;
				background-color: #FFFFFF;
				padding: 0 30rpx;

				.tab-title {
					height: 68rpx;
					line-height: 68rpx;
					display: flex;
					align-items: center;

					.tab-title-item {
						flex: 1;
						font-size: 28rpx;
						color: #8F92A1;
						border-bottom: 1px solid #F6F6F6;
						text-align: center;

						&.actice {
							color: #2D2D2D;
							border-bottom: 1px solid #2D2D2D;
						}
					}
				}

				.tab-con {
					.nodata{
						text-align: center;
						line-height: 200rpx;
					}
					.tab-con-list {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 30rpx 0;
						border-bottom: 1px solid #F6F6F6;

						.pic {
							width: 48rpx;
							height: 48rpx;
							border-radius: 50%;
							overflow: hidden;

							image {
								width: 48rpx;
								height: 48rpx;
							}
						}

						.info {
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							margin-left: 30rpx;

							text {
								&:first-child {
									font-size: 24rpx;
									color: #5F616C;
								}

								&:last-child {
									font-size: 20rpx;
									color: #8F92A1;
								}
							}
						}

						.price {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							text-align: right;
							text{
								&:first-child{
									font-size: 28rpx;
									color: #E70A0A;
									&.green {
										color: #00CC96;
									}
									
									&.blue {
										color: #0F6EFF;
									}
								}
								&:last-child{
									font-size: 20rpx;
									color: #8F92A1;
								}
							}
						}
					}
				}
			}
		}

		.bot-fixed {
			height: 100rpx;
			background: #FFFFFF;
			box-shadow: 0px -4rpx 100rpx 0px rgba(163, 163, 164, 0.22);
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;

			.btn-box {
				width: 210rpx;
				height: 72rpx;
				line-height: 72rpx;
				text-align: center;
				border-radius: 16rpx;
				font-size: 32rpx;

				&.default {
					border: 1px solid #8F92A1;
					color: #2D2D2D;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				&.green {
					background-color: #00CC96;
					color: #FFFFFF;
				}

				&.blue {
					background-color: #0F6EFF;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
