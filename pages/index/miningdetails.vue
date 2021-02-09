<template>
	<view class="miningdetails">
		<header-bar :title="i18n.header.header9"></header-bar>
		<view class="container">
			<view class="img">
				<image :src="comboInfo.pic" mode="aspectFit"></image>
			</view>
			<view class="name">
				<text>{{system_info == 'en_US'?comboInfo.en_name:comboInfo.name}}</text>
			</view>
			<view class="price">
				<text>{{i18n.index.mining16}}</text>
				<text class="number">{{minePrice + 'USDT'}}</text>
			</view>
			<view class="rule">
				<view class="rule-title">
					<text>{{i18n.index.mining17}}</text>
				</view>
				<view class="rule-con">
					<text v-html="comboInfo.remark"></text>
				</view>
			</view>
			<view class="start" @tap="open">
				<text>{{i18n.index.mining15}}</text>
			</view>
		</view>
		<view class="modal-mask" :class="{current: current}" @tap="close"></view>
		<view class="modal" :class="{current: current}">
			<view class="modal-title"></view>
			<view class="form-item">
				<input type="text" v-model="paypass" :password="active" :placeholder="i18n.withdrawal.lang20" />
				<view class="password" :class="{'active': !active}" @tap="addClass('active')"></view>
			</view>
			<view class="sure" @tap="sureConfirm">
				<text>{{i18n.index.mining15}}</text>
			</view>
			<view class="assets">
				<text>{{i18n.index.mining18}}{{comboInfo.amount}}USDT</text>
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
				mineStatus: 0,
				minePrice: 0.00,
				current: false,
				paypass: '',
				comboInfo: {},
				system_info: '',
			}
		},
		components:{
			HeaderBar
		},
		onLoad(option) {
			this.mineStatus = option.id
			this.minePrice = option.price
			this.system_info = uni.getStorageSync('system_info').language
			this.getData(option.id)
		},
		onUnload() {
			
		},
		methods: {
			getData(id){
				this.uniRequest({
					url: 'comboInfo',
					method: 'GET',
					data: {
						id
					}
				}).then(res => {
					this.comboInfo = res.result
				})
			},
			addClass(classname){
				this[classname] = !this[classname]
			},
			open(){
				this.current = true
			},
			close(){
				this.current = false
			},
			sureConfirm(){
				let paypass = this.paypass
				if(!paypass) return false
				uni.showModal({
					content: '是否确定开始挖矿',
					success: (res) => {
						if(res.confirm){
							this.sure()
						}
					}
				})
			},
			sure(){
				let id = this.mineStatus
				let paypass = this.paypass
				this.uniRequest({
					url: 'lucky',
					data: {
						id,
						paypass
					}
				}).then(res => {
					if(res.result.order){
						uni.showToast({
							title: '购置矿机成功',
							icon: 'none',
						})
					}
					this.current = false
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
.miningdetails{
	.container{
		.img{
			width: 160rpx;
			height: 230rpx;
			margin: 0 auto;
			image{
				width: 160rpx;
				display: inline;
			}
			&.img1{
				background: url('../../static/images/m1.png') center center no-repeat;
				background-size: contain;
			}
			&.img2{
				background: url('../../static/images/m2.png') no-repeat;
				background-size: contain;
			}
			&.img3{
				background: url('../../static/images/m3.png') no-repeat;
				background-size: contain;
			}
			&.img4{
				background: url('../../static/images/m4.png') no-repeat;
				background-size: contain;
			}
		}
		.name{
			font-size: 32rpx;
			color: #FFFFFF;
			line-height: 22px;
			text-align: center;
			margin-top: 32rpx;
		}
		.price{
			font-size: 42rpx;
			color: #FFFFFF;
			text-align: center;
			margin-top: 14rpx;
			.number{
				color: #D8575A;
			}
		}
		.rule{
			border-radius: 8rpx;
			background: #34374D;
			padding: 40rpx 30rpx;
			margin-top: 56rpx;
			.rule-title{
				font-size: 28rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				&::before{
					content: "";
					display: inline-block;
					width: 8rpx;
					height: 32rpx;
					background-color: #59D0CF;
					border-radius: 6rpx;
					margin-right: 10rpx;
				}
			}
			.rule-con{
				font-size: 28rpx;
				color: #FFFFFF;
				margin-top: 20rpx;
				line-height: 48rpx;
			}
		}
		.start{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			background: #59D0CF;
			border-radius: 50rpx;
			text-align: center;
			color: #FFFFFF;
			margin-top: 100rpx;
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
		background-color: #272A3F;
		border-radius: 24rpx 24rpx 0 0;
		padding: 36rpx 30rpx 50rpx;
		transform: translateY(100%);
		transition: 0.5s all;
		&.current{
			transform: translateY(0);
		}
		.modal-title{
			width: 158rpx;
			height: 42rpx;
			background: url(../../static/images/icon59.png) no-repeat;
			background-size: contain;
			margin: 0 auto 40rpx;
		}
		.sure{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			background: #59D0CF;
			border-radius: 50rpx;
			text-align: center;
			color: #FFFFFF;
			margin-top: 50rpx;
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
