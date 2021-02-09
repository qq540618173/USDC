<template>
	<view class="login">
		<picker class="picker" @change="bindPickerChange" :value="index" :range="language">
			<view class="uni-input">{{language[index]}}</view>
		</picker>
		<view class="logo">
			<image src="../../static/images/icon14.png"></image>
		</view>
		<view class="appname">
			<text>USD Coin</text>
		</view>
		<view class="login-title">
			<text>{{i18n.login.login1}}</text>
		</view>
		<view class="login-wrap">
			<view class="login-box" v-show="!loginBtn">
				<view class="login-form-item">
					<input type="text" :placeholder="i18n.login.lang79" v-model="current.phone" placeholder-class="placeholder" />
					<view class="delete" v-if="current.phone" @tap="deleteNumber"></view>
				</view>
				<view class="login-form-item">
					<input type="text" :password="!currentClass" :placeholder="i18n.login.lang80" v-model="current.password" placeholder-class="placeholder" />
					<view class="xs" :class="{'current': currentClass}" @tap="showPassWord"></view>
				</view>
			</view>
			<view class="login-box" v-show="loginBtn">
				<view class="login-form-item">
					<input type="number" :placeholder="i18n.login.lang84" v-model="current.phone" placeholder-class="placeholder" />
					<view class="delete" v-if="current.phone" @tap="deleteNumber"></view>
				</view>
				<view class="login-form-item">
					<input type="text" :placeholder="i18n.login.lang85" v-model="current.code" placeholder-class="placeholder" />
					<view class="yzm" @tap="getCode">
						<text v-show="yzHtml">{{i18n.my.lang51}}</text>
						<text v-show="!yzHtml">{{time}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="login-sub">
			<view v-show="loginBtn" @tap="changeLogin(1)">
				<text>{{i18n.login.lang77}}</text>
			</view>
			<view v-show="!loginBtn" @tap="changeLogin(2)">
				<text>{{i18n.login.lang78}}</text>
			</view>
			<view @tap="gotoPage('forget')">
				<text>{{i18n.login.lang83}}</text>
			</view>
		</view>
		<view class="login-btn" @tap="login">
			<text>{{i18n.login.lang81}}</text>
		</view>
		<view class="login-info">
			<text @tap="gotoPage('regist')">{{i18n.login.lang82}}</text>
			<text style="color: #0F6EFF;" @tap="gotoPage('/pages/service/customer')">{{i18n.service.service1}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginBtn: false,
				currentClass: false,     //显示明文密码
				time: 60,                //验证码倒计时
				yzHtml: true,    
				timer: '',               //定时器
				current: {
					phone: '',               //登录账号
					password: '',            //登录密码
					code: '',                //验证码
					form: 1,                 //登录方式 1手机号密码登录，2手机号验证码登录
				},
				language: ['简体中文', '繁體中文', 'English', '日本語', '한국어.'],
				index: 0,
			}
		},
		onLoad() {
			const phone = uni.getStorageSync('phoneStorage');
			const password = uni.getStorageSync('passwordStorage');
			this.current.phone = phone
			this.current.password = password
		},
		methods: {
			login(){
				// 登录
				let { current } = this;
				this.uniRequest({
					url: 'login',
					data: {
						...current
					},
					noToken: true
				}).then(res => {
					if(res){
						uni.setStorage({
							key: 'userInfo',
							data: res.result,
							success: info => {
								uni.redirectTo({
									url: '/pages/index/index'
								})
							}
						})
						uni.setStorageSync('phoneStorage', this.current.phone)
						uni.setStorageSync('passwordStorage', this.current.password)
					}
				})
			},
			changeLogin(type){
				// 切换登录方式
				if(type == 1){
					this.loginBtn = false
					this.current.form = 1
				}else{
					this.loginBtn = true
					this.current.form = 2
				}
				
				this.current.phone = ''
				this.current.password = ''
			},
			showPassWord(){
				// 显示明文密码
				this.currentClass = !this.currentClass
			},
			deleteNumber(){
				// 清除输入账号
				this.current.phone = ''
				this.current.password = ''
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
			gotoPage(url){
				uni.navigateTo({
					url
				})
			},
			bindPickerChange(e){
				this.index = e.target.value
				let language = ''
				switch (e.target.value) {
					case 0:
						language = "zh_CN";
						break;
					case 1:
						language = "zh_TC";
						break;
					case 2:
						language = "en_US";
						break;
					case 3:
						language = "jp_JPN";
						break;
					case 4:
						language = "kr_Kr";
						break;
				}
				const system_info = uni.getStorageSync('system_info')
				system_info.language = this._i18n.locale = language
				uni.setStorageSync('system_info',system_info)
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
html,
body{
	padding: 0;
}
/* #ifdef H5 */
uni-page-body{
	padding: 0;
}
/* #endif */
.login{
	width: 100vw;
	height: 100vh;
	background-color: #FFFFFF;
	padding: 80rpx 30rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	.picker{
		position: absolute;
		right: 40rpx;
		top: 40rpx;
		font-size: 24rpx;
		color: #BEC1C7;
		display: flex;
		align-items: center;
		&::after{
			content: "";
			display: block;
			border-top: 8rpx solid #1E1F20;
			border-left: 8rpx solid transparent;
			border-right: 8rpx solid transparent;
			margin-left: 10rpx;
		}
	}
	.logo{
		width: 200rpx;
		height: 200rpx;
		margin: 0 auto 20rpx;
		image{
			width: 200rpx;
			height: 200rpx;
		}
	}
	.appname{
		text-align: center;
		margin-bottom: 40rpx;
	}
	.login-title{
		font-size: 60rpx;
		color: #1E1F20;
		text-align: center;
		&::after{
			content: "";
			display: block;
			width: 56rpx;
			height: 6rpx;
			background: #0F6EFF;
			border-radius: 4rpx;
			margin: 20rpx auto 0;
		}
	}
	.login-wrap{
		margin-top: 80rpx;
		.login-form-item{
			width: 100%;
			height: 80rpx;
			margin-bottom: 30rpx;
			border-bottom: 1px solid rgba(171, 176, 199, 0.2);
			display: flex;
			justify-content: space-between;
			align-items: center;
			input{
				flex: 1;
				font-size: 28rpx;
				color: #1E1F20;
			}
			.placeholder{
				font-size: 28rpx;
				color: #BEC1C7;
			}
			.yzm{
				font-size: 30rpx;
				color: #0F6EFF;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}
			.delete{
				width: 40rpx;
				height: 40rpx;
				margin-left: 20rpx;
				margin-right: 20rpx;
				background: url('../../static/images/icon47.png') no-repeat;
				background-size: contain;
			}
			.xs{
				width: 40rpx;
				height: 40rpx;
				margin-left: 20rpx;
				margin-right: 20rpx;
				background: url('../../static/images/icon16.png') no-repeat;
				background-size: contain;
				&.current{
					background: url('../../static/images/icon16_1.png') no-repeat;
					background-size: contain;
				}
			}
		}
	}
	.login-sub{
		margin-top: 60rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #9B9DAB;
	}
	.login-btn{
		margin-top: 20rpx;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 32rpx;
		color: #FFFFFF;
		background: #0F6EFF;
		border-radius: 8px;
	}
	.login-info{
		text-align: center;
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #595A5E;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
