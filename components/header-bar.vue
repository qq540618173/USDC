<template>
    <view class="topbar" :class="{'bgclass': isBg, 'bggary': isGary, 'bgblue': isBlue}">
        <view class="topbar-wrap">
            <view v-if="isBack" @tap="goBack" class="back-btn"></view>
            <view v-if="isBlankBack" @tap="goBack" class="blank-back"></view>
			<view class="title">{{title}}</view>
			<view v-if="isBack || isBlankBack" class="right"></view>
			<view v-if="isSlot" class="isslot">
				<slot name="text"></slot>
			</view>
        </view>
		<view id="canvas"></view>
    </view>
</template>
 
<script>
    export default {
        data() {
            return {
                
            }
        },
        props: {
            title: { type: String, default: '' },
			isBack: { type: [Boolean, String], default: true },
			isBlankBack: { type: [Boolean, String], default: false },
			isBg: { type: [Boolean, String], default: false },
			isSlot: { type: [Boolean, String], default: false },
			isGary: { type: [Boolean, String], default: false },
			isBlue: { type: [Boolean, String], default: false },
        },
        computed: {
			i18n () {
				return this.$t('index')  
			} 
        },
        methods: {
            goBack() {
                uni.navigateBack()
            }
        }
    }
</script>

<style lang="scss">
	.topbar{
		padding-top: 40rpx;
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 128rpx;
		box-sizing: border-box;
		z-index: 990;
		&.bgclass{
			// background: url('../static/images/top.png') center no-repeat;
			// background-size: contain;
			background-color: #051C3F;
			.topbar-wrap{
				.title{
					color: #FFFFFF;
				}
			}
		}
		&.bggary{
			background-color: #F6F7FB;
			.topbar-wrap{
				.title{
					color: #2D2D2D;
				}
				.back-btn{
					width: 40rpx;
					height: 36rpx;
					background: url('../static/images/icon88.png') center no-repeat;
					background-size: contain;
				}
			}
		}
		&.bgblue{
			background-color: #0F6EFF;
			.topbar-wrap{
				.title{
					color: #FFFFFF;
				}
			}
		}
		.topbar-wrap{
			padding: 0 20rpx;
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			.back-btn{
				width: 40rpx;
				height: 36rpx;
				background: url('../static/images/back.png') center no-repeat;
				background-size: contain;
			}
			.blank-back{
				width: 40rpx;
				height: 36rpx;
				background: url('../static/images/icon88.png') center no-repeat;
				background-size: contain;
			}
			.title{
				text-align: center;
				color: #2D2D2D;
				font-size: 34rpx;
				flex: 1;
			}
			.right{
				width: 52rpx;
				height: 48rpx;
			}
			.isslot{
				position: absolute;
				font-size: 32rpx;
				color: #59D0CF;
				right: 30rpx;
			}
		}
	}
</style>