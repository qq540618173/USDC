<template>
	<view class="proposal">
		<header-bar :isBack="false" :isBlankBack="true" :title="i18n.header.header17"></header-bar>
		<view class="container">
			<view class="proposal-wrap">
				<textarea v-model="content" maxlength="-1" :placeholder="i18n.my.lang56" placeholder-class="placeholder" />
			</view>
			<view class="btn-wrap">
				<view class="btn-item" @tap="submit">{{i18n.my.lang57}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue';
	export default {
		data() {
			return {
				content: '',
			}
		},
		components:{
			HeaderBar
		},
		methods: {
			submit(){
				let { content } = this
				this.uniRequest({
					url: 'feedback',
					data: {
						content
					}
				}).then((res) =>{
					uni.showToast({
						title: res.message,
						success: () => {
							this.content = ''
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
.proposal{
	min-height: calc(100vh - 128rpx);
	background-color: #FFFFFF;
	.container{
		.proposal-wrap{
			textarea{
				width: 100%;
				height: 600rpx;
				background-color: #F6F7FB;
				border-radius: 16rpx;
				border: 1px solid #EDEFF9;
				padding: 30rpx;
				border: none;
				box-sizing: border-box;
				font-size: 24rpx;
				color: #2D2D2D;
			}
			.placeholder{
				font-size: 24rpx;
				color: #8F92A1;
			}
		}
		.btn-wrap{
			margin-top: 42rpx;
			.btn-item{
				height: 100rpx;
				line-height: 100rpx;
				border-radius: 16rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				text-align: center;
				background-color: #0F6EFF;
			}
		}
	}
}
</style>
