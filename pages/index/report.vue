<template>
	<view class="report">
		<header-bar :isBg="isBg" :title="i18n.header.header35"></header-bar>
		<view class="container">
			<scroll-view class="scrollview" scroll-y="true" lower-threshold="100" @scrolltolower="loadMore" v-if="recordsList.length">
				<view class="report-wrap" :class="{'ing': item.status == 0, 'end': item.status == 1}" v-for="(item, index) in recordsList" :key="index">
					<view class="top">
						<text class="text1">{{i18n.report.report1}}：</text>
						<text class="text2">{{item.order}}</text>
					</view>
					<view class="bot">
						<view class="text3">
							<text>{{i18n.report.report2}}</text>
						</view>
						<view class="bot-flex">
							<view>
								<text class="text2">{{item.amount}}USDC</text>
								<text class="text1">{{i18n.report.report3}}</text>
							</view>
							<view>
								<text class="text2">{{item.create_time}}</text>
								<text class="text1">{{i18n.report.report4}}</text>
							</view>
						</view>
					</view>
					<view class="bot">
						<view class="text3">
							<text>{{i18n.report.report5}}</text>
						</view>
						<view class="bot-flex">
							<view>
								<text class="text2">{{item.arrive}}USDC</text>
								<text class="text1">{{i18n.report.report3}}</text>
							</view>
							<view>
								<text class="text2">{{item.up_time}}</text>
								<text class="text1">{{i18n.report.report4}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="nomore" v-if="recordsList.length == total && recordsList.length != 0">
					<text>{{i18n.index.mining14}}</text>
				</view>
			</scroll-view>
			<view class="nodata" v-if="recordsList.length == 0">
				<text>{{i18n.history.history17}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue';
	export default {
		data() {
			return {
				pageNum: 1,
				total: '',
				isBg: true,
				recordsList: [],
			}
		},
		components:{
			HeaderBar
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData(){
				let { pageNum } = this
				this.uniRequest({
					url: 'records',
					method: 'GET',
					data: {
						page: pageNum,
						limit: 10
					}
				}).then(res => {
					this.total = res.result.total
					this.recordsList = this.recordsList.concat(res.result.data)
				})
			},
			loadMore(){
				// 加载更多
				if(this.recordsList.length < this.total){
					this.pageNum+=1
					this.getData()
				}
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
.report{
	min-height: calc(100vh - 128rpx);
	background-color: #051C3F;
	.container{
		.scrollview{
			height: calc(100vh - 188rpx);
			.nomore{
				font-size: $fontI;
				color: $colorE;
				text-align: center;
			}
		}
		.report-wrap{
			background: #13294A;
			border-radius: 8px;
			padding: 0 30rpx;
			border: 1px solid rgba(255, 255, 255, 0.08);
			position: relative;
			margin-bottom: 20rpx;
			&.ing{
				&::after{
					content: "";
					display: block;
					width: 120rpx;
					height: 106rpx;
					background: url(../../static/images/icon99.png);
					background-size: contain;
					position: absolute;
					right: 60rpx;
					top: 34rpx;
				}
			}
			&.end{
				&::after{
					content: "";
					display: block;
					width: 120rpx;
					height: 106rpx;
					background: url(../../static/images/icon100.png);
					background-size: contain;
					position: absolute;
					right: 60rpx;
					top: 34rpx;
				}
			}
			.text1{
				font-size: 24rpx;
				color: #4C5D76;
			}
			.text2{
				font-size: 32rpx;
				color: #FFFFFF;
			}
			.text3{
				font-size: 28rpx;
				color: #869DC0;
			}
			.top{
				height: 120rpx;
				line-height: 120rpx;
			}
			.bot{
				border-top: 2rpx solid #051C3F;
				padding: 16rpx 0;
				.bot-flex{
					margin-top: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					>view{
						display: flex;
						flex-direction: column;
						text{
							margin-bottom: 4rpx;
						}
						&:last-child{
							text-align: right;
						}
					}
				}
			}
		}
		.mt10{
			margin-top: 10rpx;
		}
		.mt20{
			margin-top: 10rpx;
		}
		.nodata{
			font-size: $fontG;
			color: $colorA;
			text-align: center;
			line-height: 300rpx;
		}
	}
}
</style>
