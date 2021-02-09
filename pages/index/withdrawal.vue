<template>
	<view class="withdrawal">
		<header-bar :isBg="true"></header-bar>
		<view class="container">
			<picker class="picker" @change="bindPickerChange($event, coinList)" :value="index" :range-key="'coin'" :range="coinList">
				<view class="uni-input">{{coinList[index]?coinList[index].coin:''}}{{i18n.header.header4}}</view>
			</picker>
			<view class="form-wrap">
				<view class="form-wrap-top">
					<view class="left">{{i18n.my.lang60}}{{indexData.coin}}{{i18n.my.lang60_1}}</view>
					<view class="right">{{indexData.capital}}</view>
				</view>
				<view class="form-wrap-bot">
					<view class="bot-wrap">
						<view class="form-item">
							<text>{{i18n.withdrawal.lang17}}</text>
							<input type="text" v-model="current.address" :placeholder="i18n.withdrawal.lang17" />
						</view>
						<view class="form-item">
							<text>{{i18n.withdrawal.lang18}}</text>
							<input type="digit" v-model="current.amount" :placeholder="i18n.withdrawal.lang18" />
						</view>
						<view class="form-item">
							<text>{{i18n.withdrawal.lang19}}({{indexData.coin}})</text>
							<input class="shrink" type="text" v-model="current.amount?calc:''" placeholder="0.00" disabled="true" />
						</view>
						<view class="form-item">
							<text>{{i18n.my.lang63}}</text>
							<view class="mm">
								<input type="text" v-model="current.paypass" :password="active" :placeholder="i18n.withdrawal.lang20" />
								<view class="password" :class="{'active': !active}" @tap="addClass('active')"></view>
							</view>
						</view>
					</view>
					<view class="tip">
						<image src="../../static/images/icon17.png"></image>
						<text>{{i18n.withdrawal.lang21}}</text>
					</view>
				</view>
				<view class="fee">
					<text>手续费: {{calcFee}}</text>
				</view>
			</view>
			<view class="withdrawal-submit">
				<view class="form-submit" @tap="submit">{{i18n.withdrawal.lang22}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue';
	export default {
		data() {
			return {
				active: true,
				current: {       
					address: '',
					amount: '',
					paypass: '',
				},
				index: 0,
				rate: '',             //汇率
				indexData: {},        //USDT数量
				coinList: [],
				coin: 'USDC',
				
			}
		},
		components:{
			HeaderBar
		},
		onLoad(options){
			if(options.coin){
				this.coin = options.coin
				if(options.coin == 'USDT'){
					this.index = 1
				}
			}
			this.getRate()
			this.getData()
		},
		methods: {
			addClass(classname){
				this[classname] = !this[classname]
			},
			submit(){
				// 提交信息
				let { current, indexData } = this
				this.uniRequest({
					url: 'withdraw',
					data: {
						...current,
						coin_id: indexData.id
					}
				}).then(res => {
					uni.showToast({
						title: res.message,
						icon: 'none',
						success: () => {
							setTimeout(()=>{
								this.getData()
								this.current = {
									address: '',
									amount: '',
									paypass: '',
								}
							},2000)
						}
					})
				})
			},
			getRate(){
				// 获取汇率
				this.uniRequest({
					url: 'getRatio',
					method: 'GET'
				}).then(res => {
					this.rate = res.result.withd_ratio
				})
			},
			getData(){
				let { coin } = this
				this.uniRequest({
					url: 'isChangeCoin',
					method: 'GET'
				}).then(res => {
					this.indexData = res.result.filter(item => item.coin == coin)[0]
					this.coinList = res.result
				})
			},
			bindPickerChange(e, v){
				this.index = e.target.value
				
				this.indexData = this.coinList.filter(item => item.coin == v[e.target.value].coin)[0]
			},
		},
		computed: {  
			i18n(){  
				return this.$t('index')  
			},
			calc(){
				return (this.current.amount*(1 - (this.rate/100))).toFixed(2)
			},
			calcFee(){
				return (this.current.amount*(this.indexData.fee/100)).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.withdrawal{
	min-height: calc(100vh - 128rpx);
	background-color: #051C3F;
	.container{
		.picker{
			font-size: 34rpx;
			color: #FFFFFF;
			margin-bottom: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			&::after{
				content: "";
				display: block;
				border-top: 10rpx solid #DBE3ED;
				border-left: 10rpx solid transparent;
				border-right: 10rpx solid transparent;
				margin-left: 10rpx;
			}
		}
		.form-wrap{
			.form-wrap-bot{
				.tip{
					display: flex;
					align-items: center;
					padding: 30rpx;
					image{
						width: 32rpx;
						height: 32rpx;
						margin-right: 14rpx;
					}
					text{
						color: #FF5023;
						font-size: 20rpx;
					}
				}
				.shrink{
					min-width: 200rpx;
				}
			}
		}
		.fee{
			margin-top: 24rpx;
			font-size: 24rpx;
			color: #4C5D76;
			padding: 0 30rpx;
		}
		.withdrawal-submit{
			margin-top: 80rpx;
			.form-submit{
				background-color: #00CC96;
			}
		}
	}
}
</style>
