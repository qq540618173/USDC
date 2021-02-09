<template>
	<view class="revenue">
		<header-bar :isBg="isBg" :title="i18n.header.header32"></header-bar>
		<view class="container">
			<scroll-view class="scrollview" scroll-y="true" lower-threshold="100" @scrolltolower="loadMore" v-if="incomeList.length">
				<view class="revenue-wrap" v-for="(item, index) in incomeList" :key="index">
					<view class="revenue-top">
						<view class="revenue-top-item">
							<view class="text1">
								<text>{{i18n.revenue.revenue1}}</text>
							</view>
							<view class="text2 mt10">
								<text>{{item.create_time}}</text>
							</view>
						</view>
						<view class="revenue-top-item">
							<view class="text1">
								<text>{{i18n.revenue.revenue2}}</text>
							</view>
							<view class="item-flex mt10">
								<view class="text2">
									<text>{{item.totalIncome}} USDC</text>
								</view>
								<!-- <view class="btn">
									<text class="red" @tap="open(2, item.id)">{{i18n.revenue.revenue3}}</text>
									<text class="green" @tap="open(3, item.id)">{{i18n.revenue.revenue4}}</text>
								</view> -->
							</view>
						</view>
						<view class="revenue-top-item">
							<view>
								<text class="text1">{{i18n.revenue.revenue5}}：</text>
								<text class="text3">{{item.sfIncome}} USDC</text>
							</view>
							<view class="mt10">
								<text class="text1">{{i18n.revenue.revenue6}}：</text>
								<text class="text3">{{item.lbIncome}} USDC</text>
							</view>
						</view>
					</view>
					<view class="revenue-bot">
						<view class="left">
							<text>{{i18n.revenue.revenue7}}</text>
						</view>
						<view class="center">
							<view>
								<text class="color1">{{i18n.revenue.revenue8}}：</text>
								<text class="color2">{{item.totalIncome}} USDC</text>
							</view>
							<view class="mt20">
								<text class="color1">{{i18n.revenue.revenue9}}：</text>
								<text class="color2">{{item.jtIncome}} USDC</text>
							</view>
						</view>
						<view class="right">
							<view>
								<text class="color1">{{i18n.revenue.revenue10}}：</text>
								<text class="color2">{{item.ztIncome}} USDC</text>
							</view>
							<view>
								<text class="color1">{{i18n.revenue.revenue11}}：</text>
								<text class="color2">{{item.tdIncome}} USDC</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="nomore" v-if="incomeList.length == total && incomeList.length != 0">
				<text>{{i18n.index.mining14}}</text>
			</view>
			<view class="nodata" v-if="incomeList.length == 0">
				<text>{{i18n.history.history17}}</text>
			</view>
		</view>
		<view class="modal-mask" :class="{current: current}" @tap="close"></view>
		<view class="modal" :class="{current: current}">
			<view class="modal-title" v-show="status == 2">{{i18n.revenue.revenue12}}</view>
			<view class="modal-title" v-show="status == 3">{{i18n.revenue.revenue13}}</view>
			<view class="form-item" v-if="status == 3">
				<input type="digit" v-model="submitData.amount" :placeholder="i18n.revenue.revenue14" />
			</view>
			<view class="form-item">
				<input type="text" v-model="submitData.paypass" :password="active" :placeholder="i18n.revenue.revenue15" />
				<view class="password" :class="{'active': !active}" @tap="addClass('active')"></view>
			</view>
			<view class="sure bggreen mt40" @tap="sureConfirm">
				<text>{{i18n.revenue.revenue16}}</text>
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
				incomeList: [],
				isBg: true,
				current: false,
				active: true,
				status: 2,      // 2:复投  3:加仓
				submitData: {},
				submitId: '',
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
					url: 'incomeList',
					method: 'GET',
					data: {
						page: pageNum,
						limit: 10
					}
				}).then(res => {
					this.total = res.result.total
					this.incomeList = this.incomeList.concat(res.result.data)
				})
			},
			loadMore(){
				// 加载更多
				if(this.incomeList.length < this.total){
					this.pageNum+=1
					this.getData()
				}
			},
			open(status, id){
				this.current = true
				this.status = status
				this.submitId = id
			},
			close(){
				this.current = false
				this.amount = ""
				this.paypass = ""
			},
			addClass(classname){
				this[classname] = !this[classname]
			},
			sureConfirm(){
				let { status, submitData, submitId } = this
				this.uniRequest({
					url: 'lucky',
					data: {
						id: submitId,
						type: status,
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
.revenue{
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
		.revenue-wrap{
			background: #1E385F;
			border-radius: 8px;
			border: 1px solid rgba(255, 255, 255, 0.1);
			margin-bottom: 30rpx;
			.revenue-top{
				background: #13294A;
				border-radius: 8px;
				border: 1px solid rgba(255, 255, 255, 0.08);
				margin: -1px -1px 0;
				padding: 0 30rpx;
				.revenue-top-item{
					border-bottom: 1px solid #051C3F;
					padding: 20rpx 0;
					&:last-child{
						border: none;
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
						font-size: 26rpx;
						color: #D9DEE4;
					}
					.item-flex{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.btn{
							text{
								display: inline-block;
								width: 140rpx;
								height: 52rpx;
								line-height: 52rpx;
								text-align: center;
								border-radius: 8rpx;
								font-size: 26rpx;
								color: #FFFFFF;
								&.red{
									background-color: #FF5023;
									margin-right: 16rpx;
								}
								&.green{
									background-color: #00CC96;
								}
							}
						}
					}
				}
			}
			.revenue-bot{
				padding: 20rpx 30rpx;
				display: flex;
				justify-content: space-between;
				.left{
					width: 38rpx;
					height: 100rpx;
					border-radius: 6rpx;
					border: 1px solid rgba(0, 102, 255, 0.2);
					font-size: 22rpx;
					color: #FFFFFF;
					margin-right: 10rpx;
					text-align: center;
				}
				.center,
				.right{
					font-size: 26rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 10rpx 0;
				}
				.center{
					flex: 1;
				}
				.color1{
					color: #4C5D76;
				}
				.color2{
					color: #D9DEE4;
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
			transform: translateY(0rpx);
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
			&.mt40{
				margin-top: 40rpx;
			}
		}
		.tips{
			font-size: 24rpx;
			color: #4C5D76;
			margin-bottom: 16rpx;
			padding-left: 30rpx;
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
