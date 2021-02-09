<template>
	<view class="trade">
		<view class="top-tab">
			<text :class="{'active': indexShow == 0}" @tap="tab(0)">行情</text>
			<text :class="{'active': indexShow == 1}" @tap="tab(1)">快讯</text>
			<text :class="{'active': indexShow == 2}" @tap="tab(2)">独家</text>
		</view>
		<view class="content" v-show="indexShow == 0">
			<view class="charts-wrap">
				<view class="charts-title">
					<text>{{i18n.trade.trade1}}</text>
				</view>
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				<!-- <view class="bot-data">
					<text>{{i18n.trade.trade6}}：</text>
					<text>{{botData}}$</text>
				</view> -->
			</view>
			<view class="charts-wrap mt30">
				<view class="charts-title">
					<text>{{i18n.trade.trade2}}</text>
				</view>
				<view class="table">
					<view class="th">
						<view>{{i18n.trade.trade3}}</view>
						<view>{{i18n.trade.trade4}}</view>
						<view>{{i18n.trade.trade5}}</view>
					</view>
					<view class="tbody">
						<view class="td" v-for="(item, index) in marketInfo" :key="index">
							<view><image :src="item.pic"></image>{{index | toUpperCase}}</view>
							<view>${{item.usd}}</view>
							<view>
								<text :class="[item.gains >= 0?'increase':'reduce']">{{item.gains}}%</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="app">
				<view class="title2 title-line">交易</view>
				<view class="app-item">
					<view class="img"><image src="../../static/images/icon79.png"></image></view>
					<view class="info">
						<view class="name">
							<text>OTC交易</text>
						</view>
						<view class="details">
							<text>支持USDT、ETH、BTC等</text>
						</view>
					</view>
				</view>
				<view class="app-item">
					<view class="img"><image src="../../static/images/icon72.png"></image></view>
					<view class="info">
						<view class="name">
							<text>Uniswap</text>
						</view>
						<view class="details">
							<text>去中心化交易所</text>
						</view>
					</view>
				</view>
				<view class="app-item">
					<view class="img"><image src="../../static/images/icon80.png"></image></view>
					<view class="info">
						<view class="name">
							<text>SushiSwap</text>
						</view>
						<view class="details">
							<text>去中心化交易所</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content" v-show="indexShow == 1">
			<view class="kx-item" v-for="(item, index) in kxList" :key="index">
				<view>
					<view class="title" @tap="gotoDetail(item.id)">
						<text>{{item.title}}</text>
					</view>
					<view class="intro" @tap="gotoDetail(item.id)">
						<text v-html="item.introduction"></text>
					</view>
					<view class="share">
						<view @tap="like(item.id, 'good')">
							<image src="../../static/images/icon92.png" mode=""></image>
							<text>{{i18n.trade.trade7}}</text>
							<text>{{item.good}}</text>
						</view>
						<view @tap="like(item.id, 'bad')">
							<image src="../../static/images/icon93.png" mode=""></image>
							<text>{{i18n.trade.trade8}}</text>
							<text>{{item.bad}}</text>
						</view>
					</view>
				</view>
				<view class="pic">
					<image :src="item.pic" mode=""></image>
				</view>
			</view>
		</view>
		<view class="content" v-show="indexShow == 2">
			<view class="dj-item" v-for="(item, index) in djList" :key="index" @tap="gotoDetail(item.id)">
				<view class="info">
					<text>{{item.title}}</text>
					<text v-html="item.introduction"></text>
					<text>{{item.create_time}}</text>
				</view>
				<view class="pic">
					<image :src="item.pic" mode=""></image>
				</view>
			</view>
		</view>
		<tabbar :isCurrent="3"></tabbar>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue'
	import Tabbar from '../../components/tabbar.vue'
	import uCharts from '../../components/u-charts.min'
	
	var _self;
	var canvaLineA=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				chartData: {
					categories: [],
					series: []
				},
				marketInfo: [],
				botData: '暂无数据',
				indexShow: 0,
				kxList: [],
				djList: [],
			}
		},
		components: {
			HeaderBar,
			Tabbar
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getData()
			this.getMarketInfo()
			this.getNotice(3)
			this.getNotice(5)
		},
		methods: {
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
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
						gridType: 'dash',
						gridColor: '#2D2D2D',
						splitNumber: 2,
						// min: 0,
						// max: 2
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
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			getData(){
				// this.uniRequest({
				// 	url: 'getPriceLog',
				// 	method: 'GET',
				// 	data: {
				// 		limit: 6
				// 	}
				// }).then(res => {
				// 	this.chartData = {
				// 		categories: res.result.list.create_time,
				// 		series: [
				// 			{
				// 				name: 'USDC',
				// 				data:  res.result.list.price,
				// 			}
				// 		]
				// 	}
				// 	this.showLineA("canvasLineA", this.chartData)
				// 	this.botData = res.result.list.maker[0]?res.result.list.maker[0]:''
				// })
				this.uniRequest({
					url: 'marketCoinInfo',
					method: 'GET',
					data: {
						coin_id: 3
					}
				}).then(res => {
					this.chartData = {
						categories: res.result.date,
						series: [{
							name: 'USDC',
							data: res.result.price,
						}]
					}
					this.showLineA("canvasLineA", this.chartData)
				})
			},
			getMarketInfo(){
				this.uniRequest({
					url: 'marketInfo',
					method: 'GET',
				}).then(res => {
					this.marketInfo = res.result
				})
			},
			tab(oIndex){
				this.indexShow = oIndex
			},
			getNotice(type){
				this.uniRequest({
					url: 'notice',
					method: 'GET',
					data: {
						type
					}
				}).then(res => {
					if(type == 3){
						this.djList = res.result.data
					}
					if(type == 5){
						this.kxList = res.result.data
					}
				})
			},
			like(id, type){
				this.uniRequest({
					url: 'like',
					method: 'GET',
					data: {
						id,
						type
					}
				}).then(res => {
					this.getNotice(5)
				})
			},
			gotoDetail(id){
				// 详细页
				uni.navigateTo({
					url: `/pages/my/newsdetail?id=${id}`
				})
			},
		},
		computed: {  
			i18n () {  
				return this.$t('index')  
			}  
		},
		filters: {
			toUpperCase(val){
				return val.toUpperCase()
			}
		}
	}
</script>

<style lang="scss">
/* #ifdef H5 */
uni-page-body{
	padding-bottom: 100rpx;
	padding-top: 0;
}
/* #endif */
.trade{
	min-height: calc(100vh - 100rpx);
	box-sizing: border-box;
	background-color: #FFFFFF;
	.top-tab{
		font-size: 32rpx;
		color: #8F92A1;
		padding: 0 30rpx;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 10rpx solid #F6F7FB;
		margin-bottom: 20rpx;
		text{
			margin-right: 40rpx;
			&.active{
				font-size: 38rpx;
				color: #2D2D2D;
			}
		}
	}
	.content{
		background-size: contain;
		.bot-data{
			text-align: center;
			text{
				font-size: 24rpx;
				color: #B5B9CA;
			}
		}
		.app{
			margin-top: 50rpx;
			padding: 20rpx 30rpx 20rpx;
			border-top: 10rpx solid #F6F7FB;
			.title{
				width: 194rpx;
				height: 42rpx;
				background: url(../../static/images/icon70.png) no-repeat;
				background-size: contain;
			}
			.title1{
				width: 90rpx;
				height: 42rpx;
				background: url(../../static/images/icon74.png) no-repeat;
				background-size: contain;
			}
			.title2{
				width: 78rpx;
				height: 42rpx;
				line-height: 42rpx;
				text-align: center;
			}
			.title3{
				width: 82rpx;
				height: 42rpx;
				background: url(../../static/images/icon81.png) no-repeat;
				background-size: contain;
			}
			.title-line{
				position: relative;
				margin-bottom: 22rpx;
				&::after{
					content: "";
					display: block;
					width: 70rpx;
					height: 6rpx;
					background-color: #0F6EFF;
					position: absolute;
					left: 50%;
					margin-left: -35rpx;
					bottom: -10rpx;
				}
			}
			.app-item{
				display: flex;
				align-items: center;
				margin-bottom: 12rpx;
				position: relative;
				background: #F6F7FB;
				border-radius: 16rpx;
				padding: 30rpx;
				&::after{
					content: "暂未开放";
					display: flex;
					justify-content: flex-end;
					align-items: flex-start;
					color: #E80F0F;
					font-size: 24rpx;
					padding: 30rpx;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
				}
				.img{
					width: 76rpx;
					height: 76rpx;
					margin-right: 40rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.name{
					font-size: 28rpx;
					color: #2D2D2D;
					margin-bottom: 4rpx;
				}
				.details{
					font-size: 26rpx;
					color: #8F92A1;
				}
			}
		}
		.swiper1{
			margin: 40rpx 30rpx 30rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.mt30{
			margin-top: 30rpx;
		}
		.table{
			padding: 20rpx 30rpx 40rpx;
			.th{
				display: flex;
				justify-content: center;
				align-items: center;
				view{
					width: 33.33333%;
					font-size: 24rpx;
					color: #B5B9CA;
					text-align: center;
					line-height: 100rpx;
					border-bottom: 1px solid #F6F6F6;
					&:last-child{
						text-align: right;
						padding-right: 40rpx;
						box-sizing: border-box;
					}
				}
			}
			.td{
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 1px solid #F6F6F6;
				view{
					flex: 1;
					font-size: 28rpx;
					color: #5F616C;
					text-align: center;
					line-height: 114rpx;
					height: 114rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					&:first-child{
						justify-content: flex-start;
						padding-left: 10rpx;
					}
					&:last-child{
						justify-content: flex-end;
						padding-right: 10rpx;
					}
					text{
						display: inline-block;
						width: 150rpx;
						height: 64rpx;
						line-height: 64rpx;
						border-radius: 8rpx;
						color: #FFFFFF;
						&.increase{
							background: linear-gradient(90deg, #00E8C7 0%, #00CC96 100%);
						}
						&.reduce{
							background: linear-gradient(90deg, #F57272 0%, #E70B0B 100%);
						}
					}
					image{
						width: 60rpx;
						height: 60rpx;
						margin-right: 6rpx;
					}
				}
			}
		}
		.charts-wrap{
			overflow: hidden;
			position: relative;
			&.mt30{
				border-top: 10rpx solid #F6F7FB;
			}
			.charts-title{
				padding: 20rpx 0;
				font-size: 30rpx;
				color: #2D2D2D;
				text-align: center;
			}
			.qiun-charts {
				width: 750upx;
				height: 500upx;
			}
			
			.charts {
				width: 750upx;
				height: 500upx;
			}
		}
		.area{
			padding: 32rpx 30rpx 70rpx;
			margin: 24rpx 30rpx 0;
			background-color: #34374D;
			border-radius: 8rpx;
			.area-title{
				width: 314rpx;
				height: 38rpx;
				background: url('../../static/images/icon51.png') no-repeat;
				background-size: contain;
				margin: 0 auto;
			}
			.area-content{
				margin-top: 38rpx;
				position: relative;
				image{
					width: 100%;
				}
			}
		}
		.game{
			padding: 32rpx 30rpx 70rpx;
			margin: 24rpx 30rpx 0;
			background-color: #34374D;
			border-radius: 8rpx;
			.game-title{
				width: 228rpx;
				height: 38rpx;
				background: url('../../static/images/icon55.png') no-repeat;
				background-size: contain;
				margin: 0 auto;
			}
			.game-content{
				margin-top: 38rpx;
				position: relative;
				image{
					width: 100%;
				}
			}
		}
		.none{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			font-size: $fontH;
			color: $colorE;
		}
		.kx-item{
			padding: 30rpx;
			border-bottom: 1px solid #F6F7FB;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.pic{
				width: 232rpx;
				height: 140rpx;
				image{
					width: 232rpx;
					height: 140rpx;
				}
			}
			.title{
				font-size: 28rpx;
				color: #2D2D2D;
				margin-bottom: 8rpx;
				height: 40rpx;
				line-height: 40rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: calc(100vw - 292rpx);
			}
			.intro{
				font-size: 24rpx;
				color: #8F92A1;
				line-height: 36rpx;
				max-height: 108rpx;
				max-width: calc(100vw - 292rpx);
				overflow: hidden;
				margin-bottom: 20rpx;
			}
			.share{
				display: flex;
				align-items: center;
				>view{
					margin-right: 40rpx;
					display: flex;
					align-items: center;
					text{
						font-size: 20rpx;
						color: #BBC0D5;
						margin-right: 4rpx;
					}
				}
				image{
					width: 22rpx;
					height: 22rpx;
					margin-right: 6rpx;
				}
			}
		}
		.dj-item{
			padding: 30rpx;
			border-bottom: 1px solid #F6F7FB;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.info{
				height: 140rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-right: 24rpx;
				text{
					&:first-child{
						font-size: 28rpx;
						color: #2D2D2D;
					}
					&:nth-child(2){
						font-size: 24rpx;
						color: #8F92A1;
						line-height: 32rpx;
						height: 64rpx;
						overflow: hidden;
					}
					&:last-child{
						font-size: 20rpx;
						color: #BBC0D5;
					}
				}
			}
			.pic{
				width: 232rpx;
				height: 140rpx;
				image{
					width: 232rpx;
					height: 140rpx;
				}
			}
		}
	}
}
</style>
