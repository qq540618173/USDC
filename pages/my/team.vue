<template>
	<view class="team">
		<header-bar :isBg="true" :title="i18n.header.header23"></header-bar>
		<view class="container">
			<view class="bg">
				<view class="total">
					<text>{{i18n.my.lang104}}{{total.total}}</text>
					<text>{{i18n.my.lang108}}{{total.totalInvest}} USDC</text>
					<text>{{i18n.my.lang109}}{{total.myInvest}} USDC</text>
				</view>
				<view v-for="(item, index) in teamList" :key="index" class="mb20">
					<view class="team-wrap">
						<view class="team-top">
							<view class="team-top-left">
								<view class="phone">
									<text>{{item.phone}}({{item.level}}{{i18n.my.lang71}})</text>
								</view>
								<view class="time">
									<text>{{i18n.my.lang67}}:{{item.create_time}}</text>
								</view>
							</view>
							<view class="team-top-right">
								<view class="amount">
									<text>{{i18n.my.lang66}}</text>
								</view>
								<view class="money">
									<text>{{item.invest}}USDT</text>
								</view>
							</view>
						</view>
						<view class="team-bot">
							<view class="team-bot-item">
								<view class="left">
									<text>{{i18n.my.lang69}}</text>
								</view>
								<view class="right">
									<text>{{item.teams}}{{i18n.my.lang70}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="check">
						<view class="check-left" v-show="item.level != 3 && item.path" @tap="getData(item.id)">
							<text>{{i18n.my.lang95}}</text>
						</view>
						<view class="check-right" v-show="item.level != 1 && item.last_id" @tap="getData(item.last_id)">
							<text>{{i18n.my.lang96}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue';
	import Treelist from '../../components/treelist.vue';
	export default {
		data() {
			return {
				teamList: [],
				total: {},
			}
		},
		components:{
			HeaderBar,
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData(id){
				this.uniRequest({
					url: 'teams',
					method: 'GET',
					data: {
						id
					}
				}).then(res => {
					if(res.result.list.length){
						this.teamList = res.result.list
						this.total = res.result
						this.phone = ''
					}
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
.team{
	min-height: calc(100vh - 128rpx);
	background-color: #051C3F;
	.container{
		padding: 20rpx 0;
		.bg{
			padding: 0 30rpx;
			.total{
				line-height: 60rpx;
				text-align: center;
				font-size: 28rpx;
				color: #FFFFFF;
				background: #13294A;
				border-radius: 16rpx;
				border: 1px solid rgba(255, 255, 255, 0.08);
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				padding: 20rpx 30rpx;
				margin-bottom: 40rpx;
			}
			.mb20{
				margin-bottom: 20rpx;
				background: #13294A;
				border-radius: 16rpx;
				border: 1px solid rgba(255, 255, 255, 0.08);
			}
			.team-wrap{
				padding: 30rpx;
				// position: relative;
				// &::after{
				// 	content: "";
				// 	display: block;
				// 	height: 2rpx;
				// 	// background: url('../../static/images/icon19.png') repeat-x;
				// 	position: absolute;
				// 	left: 30rpx;
				// 	right: 30rpx;
				// 	bottom: 0;
				// }
				.team-top{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 36rpx;
					.team-top-left{
						.phone{
							font-size: $fontI;
							color: $colorA;
							line-height: 40rpx;
						}
						.time{
							font-size: $fontk;
							color: $colorB;
							line-height: 28rpx;
							margin-top: 6rpx;
						}
					}
					.team-top-right{
						text-align: right;
						.amount{
							font-size: $fontJ;
							color: $colorB;
							line-height: 28rpx;
						}
						.money{
							font-size: $fontI;
							color: #0F6EFF;
							line-height: 40rpx;
							margin-top: 6rpx;
						}
					}
				}
				.team-bot{
					padding: 28rpx 30rpx;
					background-color: #292F42;
					border-radius: 8rpx;
					display: none;
					.team-bot-item{
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 24rpx;
						&:last-child{
							margin-bottom: 0;
						}
						.left{
							font-size: $fontJ;
							color: $colorB;
						}
						.right{
							font-size: $fontJ;
							color: $colorA;
						}
					}
				}
			}
			.check{
				font-size: $fontJ;
				color: #0F6EFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				// padding: 20rpx 0 0;
				.check-left,.check-right{
					padding: 0 30rpx 30rpx;
					flex: 1;
				}
				.check-right{
					text-align: right;
				}
			}
		}
	}
	
}
</style>
