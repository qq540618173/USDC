<template>
	<view class="regist">
		<view class="back" @tap="gotoBack"></view>
		<view class="login-title">
			<text>{{i18n.login.login3}}</text>
		</view>
		<view class="regist-wrap">
			<view class="regist-form-item">
				<input type="number" v-model="current.phone" :placeholder="i18n.login.lang84" placeholder-class="placeholder" />
				<view class="delete" v-if="current.phone" @tap="deleteNumber"></view>
			</view>
			<view class="regist-form-item">
				<input type="text" v-model="current.code" :placeholder="i18n.login.lang85" placeholder-class="placeholder" />
				<view class="yzm" @tap="getCode">
					<text v-show="yzHtml">{{i18n.my.lang51}}</text>
					<text v-show="!yzHtml">{{time}}</text>
				</view>
			</view>
			<view class="regist-form-item">
				<view class="mm"></view>
				<input type="text" :password="!currentClass" :placeholder="i18n.login.lang89" v-model="current.password" placeholder-class="placeholder" />
				<view class="xs" :class="{'active': currentClass}" @tap="showPassWord"></view>
			</view>
			<view class="regist-form-item">
				<view class="mm"></view>
				<input type="text" :password="!currentClass" :placeholder="i18n.login.lang90" v-model="current.password1" placeholder-class="placeholder" />
				<view class="xs" :class="{'active': currentClass}" @tap="showPassWord"></view>
			</view>
			<view class="regist-form-btn" @tap="regist">
				<text>{{i18n.login.lang91}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue';
	export default {
		data() {
			return {
				time: 60,                //验证码倒计时
				yzHtml: true,    
				timer: '',               //定时器
				currentClass: false,
				current: {
					phone: '',
					password: '',
					password1: '',
					code: '',
				}
			}
		},
		components:{
			HeaderBar
		},
		methods: {
			gotoBack(){
				uni.navigateBack()
			},
			regist(){
				let { current } = this;
				let { password, password1 } = current
				if(password == password1){
					this.uniRequest({
						url: 'forgetPassword',
						data: {
							...current
						},
						noToken: true
					}).then(res => {
						if(res){
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					})
				}else{
					uni.showToast({
						title: '两次密码不一致，请重新输入',
						icon: 'none'
					})
				}
			},
			getCode(){
				// 获取验证码
				let { phone } = this.current;
				if(this.yzHtml && phone){
					this.uniRequest({
						url: 'sendSms',
						data: {
							phone
						},
						noToken: true
					}).then(res => {
						if(res){
							uni.showToast({
								title: '验证码已发送',
								icon: 'none'
							})
							this.yzHtml = false
							this.timer = setInterval(() => {
								this.time --;
								if(this.time <= 0) {
									this.yzHtml = true
									this.time = 60
									clearInterval(this.timer)
								}
							}, 1000)
						}
					})
				} else {
					return
				}
			},
			deleteNumber(){
				// 清除输入账号
				this.current.phone = ''
			},
			showPassWord(){
				// 显示明文密码
				this.currentClass = !this.currentClass
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
html,
body{
	padding: 0;
}
/* #ifdef H5 */
uni-page-body{
	padding: 0;
}
/* #endif */
.regist{
	width: 100vw;
	height: 100vh;
	background-color: #FFFFFF;
	padding: 80rpx 30rpx;
	box-sizing: border-box;
	position: relative;
	.back{
		width: 28rpx;
		height: 28rpx;
		position: absolute;
		left: 50rpx;
		top: 40rpx;
		background: url(../../static/images/icon88.png) center no-repeat;
		background-size: contain;
	}
	.login-title{
		font-size: 60rpx;
		color: #1E1F20;
		&::after{
			content: "";
			display: block;
			width: 56rpx;
			height: 6rpx;
			background: #0F6EFF;
			border-radius: 4rpx;
			margin-top: 20rpx;
		}
	}
	.regist-wrap{
		margin-top: 140rpx;
	}
	.tip{
		font-size: $fontG;
		color: $colorE;
		margin-bottom: 50rpx;
	}
	.regist-form-item{
		height: 104rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(171, 176, 199, 0.2);
		input{
			flex: 1;
			font-size: 24rpx;
			color: #1E1F20;
		}
		.delete{
			width: 48rpx;
			height: 48rpx;
			margin-left: 20rpx;
			background: url('../../static/images/icon47.png') no-repeat;
			background-size: contain;
		}
		.placeholder{
			font-size: 24rpx;
			color: #BEC1C7;
		}
		.yzm{
			font-size: 26rpx;
			color: #0F6EFF;
			margin-left: 20rpx;
		}
		.xs{
			width: 48rpx;
			height: 48rpx;
			margin-left: 20rpx;
			background: url('../../static/images/icon16.png') no-repeat;
			background-size: contain;
			&.active{
				background: url('../../static/images/icon16_1.png') no-repeat;
				background-size: contain;
			}
		}
	}
	.regist-form-btn{
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-radius: 8rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		margin-top: 140rpx;
		background-color: #0F6EFF;
	}
}
</style>
