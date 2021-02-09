<template>
	<view class="data">
		<header-bar :isBack="isBack" :isBlue="isBlue"></header-bar>
		<view class="total-asset">
			<text>{{i18n.data.dataText2}}</text>
			<text>{{totalData.amount}} USDC</text>
			<text>≈¥{{totalData.cost}}CNY</text>
		</view>
		<view class="content">
			<view class="asset-title">
				<text>{{i18n.data.dataText1}}</text>
			</view>
			<view class="asset-list" v-for="(item, index) in dataList" :key="index">
				<view class="img">
					<image v-if="item.state == 0" src="../../static/images/icon101.png"></image>
					<image v-if="item.state == 1" src="../../static/images/icon102.png"></image>
				</view>
				<view class="left">
					<text v-if="item.is_me == 0 && item.type != 2">{{i18n.history['history'+item.type]}}</text>
					<text v-if="item.is_me == 0 && item.type == 2">{{item.remark}}</text>
					<text v-if="item.is_me == 1">{{i18n.history.history3 + item.remark}}</text>
					<text v-if="item.is_me == 2">{{i18n.history.history3_1 + item.remark + i18n.history.history3_2}}</text>
					<text>{{item.create_time}}</text>
				</view>
				<view class="right">
					<text class="green" v-if="item.state == 0">+{{item.amount}}</text>
					<text class="red" v-if="item.state == 1">-{{item.amount}}</text>
					<text>{{i18n.data.dataText3}} {{item.balance}}</text>
				</view>
			</view>
			<view class="nodata" v-if="dataList.length == 0">
				<text>{{i18n.history.history17}}</text>
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
				isBack: true,
				isBlue: true,
				dataList: [],
				totalData: {}
			}
		},
		components: {
			HeaderBar,
			Tabbar
		},
		onLoad(options) {
			this.getData(options.id)
		},
		methods: {
			getData(id){
				this.uniRequest({
					url: 'accountLogs',
					method: 'GET',
					data: {
						coin_id: id
					}
				}).then(res => {
					this.totalData = res.result
					this.dataList = res.result.list
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
.data{
	min-height: calc(100vh - 228rpx);
	box-sizing: border-box;
	background-color: #FFFFFF;
	.total-asset{
		height: 320rpx;
		background-color: #0F6EFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #FFFFFF;
		text{
			&:first-child{
				font-size: 32rpx;
			}
			&:nth-child(2){
				font-size: 52rpx;
				margin: 20rpx 0;
			}
			&:last-child{
				font-size: 24rpx;
				color: #ABCCFF;
			}
		}
	}
	.content {
		background: #F6F7FB;
		border-radius: 34px 34px 0px 0px;
		padding: 50rpx 30rpx 60rpx;
		margin-top: -60rpx;
		min-height: calc(100vh - 498rpx);
		.asset-title{
			font-size: 30rpx;
			color: #2D2D2D;
			margin-bottom: 40rpx;
		}
		.nodata{
			text-align: center;
			line-height: 200rpx;
		}
		.asset-list{
			padding: 40rpx 30rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.img{
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 10rpx;
				image{
					width: 64rpx;
					height: 64rpx;
				}
			}
			.left{
				flex: 1;
				display: flex;
				flex-direction: column;
				text{
					&:first-child{
						font-size: 24rpx;
						color: #2D2D2D;
						margin-bottom: 10rpx;
						word-break: break-all;
					}
					&:last-child{
						font-size: 24rpx;
						color: #8F92A1;
					}
				}
			}
			.right{
				display: flex;
				flex-direction: column;
				text-align: right;
				text{
					&.green{
						color: #00CC96;
					}
					&.red{
						color: #FD0000;
					}
					&:first-child{
						font-size: 24rpx;
						margin-bottom: 10rpx;
					}
					&:last-child{
						font-size: 24rpx;
						color: #8F92A1;
					}
				}
			}
		}
	}
}
</style>
