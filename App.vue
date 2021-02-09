<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import './uni.scss';
	page,
	uni-page-body{
		background-color: #FFFFFF;
	}
	uni-swiper{
		.uni-swiper-dot{
			width: 8rpx;
			height: 8rpx;
			background: rgba(255, 255, 255, 0.2);
			border-radius: 4rpx;
		}
		.uni-swiper-dot-active{
			width: 40rpx;
			background: #FFFFFF;
			border-radius: 6rpx;
		}
	}
</style>
