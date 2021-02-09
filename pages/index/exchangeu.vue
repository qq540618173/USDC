<template>
	<view class="exchangeu">
		<header-bar :isBg="true" :title="i18n.header.header5"></header-bar>
		<view class="container">
			<view class="form-wrap">
				<!-- <view class="form-wrap-bot">
					<view class="form-item">
						<input type="text" v-model="current.paypass" :password="active" :placeholder="i18n.exchange.lang26" />
						<view class="password" :class="{'active': !active}" @tap="addClass('active')"></view>
					</view>
				</view> -->
				<view class="exchange-top">
					<view>
						<picker class="picker" @change="bindPickerChange($event, coinList)" :value="index" :range-key="'coin'" :range="coinList">
							<view class="picker-box">
								<image :src="coinList[index]?coinList[index].pic:''" mode=""></image>
								<text>{{coinList[index]?coinList[index].coin:''}}</text>
							</view>
						</picker>
					</view>
					<view>
						<image :src="activeCoin.pic" mode=""></image>
						<text>{{activeCoin.coin}}</text>
					</view>
				</view>
				<view class="exchange-mid">
					<input type="digit" placeholder-class="placeholder" v-model="submitData.from_amount" :placeholder="i18n.exchange.lang24" />
					<input type="text" placeholder-class="placeholder" v-model="submitData.from_amount?calc:''" :placeholder="i18n.exchange.lang25" disabled="true" />
				</view>
				<view class="exchange-bot">
					<text>{{i18n.exchange.lang23}}：{{currentCoin.capital}}</text>
				</view>
			</view>
			<view class="tips">
				<text>{{i18n.exchange.exchange1}}：1 {{currentCoin.coin}} ≈ {{rates}}{{activeCoin.coin}}</text>
				<text>{{i18n.exchange.exchange2}}：{{currentCoin.dh_fee*100+ '%'}}</text>
			</view>
			<view class="form-submit-wrap">
				<view class="form-submit" @tap="open">{{i18n.exchange.lang27}}</view>
			</view>
		</view>
		<view class="modal-mask" :class="{current: current}" @tap="close"></view>
		<view class="modal" :class="{current: current}">
			<view class="modal-title">{{i18n.index.w11}}</view>
			<view class="form-item">
				<input type="text" v-model="submitData.paypass" :password="active" :placeholder="i18n.index.w8" />
				<view class="password" :class="{'active': !active}" @tap="addClass('active')"></view>
			</view>
			<view class="sure bgblue mt50" @tap="sureConfirm">
				<text>{{i18n.exchange.exchange3}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue';
	export default {
		data() {
			return {
				current: false,
				active: true,
				rate: '',             //汇率
				coinList: [],         //可兑换列表
				changeList: [],       //被兑换列表
				currentCoin: {},      //选中可兑换Coin
				activeCoin: {},       //选中被兑换Coin
				submitData: {},
				index: 0,
				choiseCoin: '',       //资产页跳过来的coin
			}
		},
		onLoad(options) {
			this.choiseCoin = options.coin
			this.getData()
			this.getChangeData()
		},
		components:{
			HeaderBar
		},
		methods: {
			submit(){
				// 提交信息
				let { current, indexData } = this
				this.uniRequest({
					url: 'exchange',
					data: {
						...current
					}
				}).then(res => {
					uni.showToast({
						title: res.message,
						icon: 'none',
						success: () => {
							this.current = {
								from_amount: '',
								paypass: '',
								from_coin: 'QUSD',
								to_coin: 'USDT',
							}
							this.indexData = (indexData - current.from_amount).toFixed(6)
						}
					})
				})
			},
			getData(){
				// 获取USDT
				let { choiseCoin } = this
				this.uniRequest({
					url: 'coin',
					method: 'GET'
				}).then(res => {
					this.coinList = res.result
					let cIndex = ''
					
					if(choiseCoin){
						res.result.filter((item, index) => {
							if(item.coin == choiseCoin){
								cIndex = index
							}
						})
						this.currentCoin = res.result[cIndex]
						this.index = cIndex
					}else{
						this.currentCoin = res.result[0]
						this.index = 0
					}
				})
			},
			getChangeData(){
				// 获取USDT
				let { choiseCoin } = this
				this.uniRequest({
					url: 'isChangeCoin',
					method: 'GET'
				}).then(res => {
					this.changeList = res.result
					if( choiseCoin ){
						if( choiseCoin == 'USDC' ){
							this.activeCoin = res.result[1]
						}else{
							this.activeCoin = res.result[0]
						}
					}else{
						this.activeCoin = res.result[1]
					}
				})
			},
			getRate(){
				this.uniRequest({
					url: 'getExchangeRatio',
					method: 'GET'
				}).then(res => {
					this.rate = res.result.QUSD
				})
			},
			addClass(classname){
				this[classname] = !this[classname]
			},
			bindPickerChange(e, v){
				let { coinList, changeList } = this
				this.index = e.target.value
				this.currentCoin = coinList[e.target.value]
				if( coinList[e.target.value].coin == 'USDC' ){
					this.activeCoin = changeList[1]
				}else{
					this.activeCoin = changeList[0]
				}
			},
			open(){
				let { submitData } = this
				if(!submitData.from_amount){
					return
				}
				this.current = true
			},
			close(){
				this.current = false
				this.submitData = {}
			},
			sureConfirm(){
				let { submitData, currentCoin, activeCoin } = this
				this.uniRequest({
					url: 'exchange',
					data: {
						...submitData,
						from_coin_id: currentCoin.id,
						to_coin_id: activeCoin.id,
					}
				}).then(res => {
					uni.showToast({
						title: '兑换成功',
						icon: 'none',
						success: () => {
							setTimeout(()=> {
								this.getData()
							},1000)
						}
					})
					this.close()
				})
			}
		},
		computed: {  
			i18n () {  
				return this.$t('index')  
			},
			calc(){
				return ((this.submitData.from_amount * this.currentCoin.rate) - (this.submitData.from_amount * this.currentCoin.dh_fee)).toFixed(6)
			},
			rates(){
				return (1 * this.currentCoin.rate / this.activeCoin.rate).toFixed(6)
			}
		}
	}
</script>

<style lang="scss">
.exchangeu{
	min-height: calc(100vh - 128rpx);
	background-color: #051C3F;
	.container{
		.shrink{
			min-width: 200rpx;
		}
		.form-wrap{
			background: #13294A;
			border-radius: 24rpx;
			padding: 40rpx 30rpx;
			.exchange-top{
				padding-bottom: 40rpx;
				border-bottom: 1px solid #051C3F;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
				&::after{
					content: "";
					display: block;
					width: 100rpx;
					height: 100rpx;
					background:#13294A url(../../static/images/icon94.png) center no-repeat;
					background-size: 60rpx 60rpx;
					position: absolute;
					left: 50%;
					bottom: -50rpx;
					margin-left: -50rpx;
				}
				.picker-box,
				>view{
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #FFFFFF;
				}
				.picker-box{
					&::after{
						content: "";
						display: block;
						width: 0;
						height: 0;
						border-top: 10rpx solid #DBE3ED;
						border-left: 10rpx solid transparent;
						border-right: 10rpx solid transparent;
						margin-left: 8rpx;
					}
				}
				image{
					width: 68rpx;
					height: 68rpx;
					margin-right: 8rpx;
					border-radius: 50%;
				}
			}
			.exchange-mid{
				margin-top: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				input{
					width: 252rpx;
					height: 74rpx;
					border-bottom: 4rpx solid #051C3F;
					background: none;
					font-size: 24rpx;
					color: #FFFFFF;
					&.placeholder{
						font-size: 24rpx;
						color: #4C5D76;
					}
				}
			}
			.exchange-bot{
				margin-top: 30rpx;
				font-size: 24rpx;
				color: #EFF0F4;
			}
		}
		.tips{
			display: flex;
			flex-direction: column;
			font-size: 24rpx;
			color: #4C5D76;
			margin-top: 20rpx;
			line-height: 40rpx;
		}
		.form-submit-wrap{
			.form-submit{
				background-color: #00CC96;
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
			&.mt50{
				margin-top: 50rpx;
			}
		}
	}
}
</style>
