<template>
	<view class="flag">
		<view class="flag1">
			<image src="../../static/images/flag1.gif"></image>
		</view>
		<view class="flag2">
			<image src="../../static/images/flag2.gif"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			setTimeout(function() {
				uni.navigateTo({
					url: 'login',
					animationDuration: 300
				});
			}, 3000)
		},
		methods: {
			
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
.flag{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100vh;
	.flag1{
		margin-top: 400rpx;
		image{
			width: 242rpx;
			height: 206rpx;
		}
	}
	.flag2{
		margin-top: 400rpx;
		image{
			width: 770rpx;
			height: 175rpx;
		}
	}
}
</style>
