<template>
	<view class="news">
		<header-bar :isBack="isBack" :isBlankBack="isBlankBack" :title="i18n.header.header18"></header-bar>
		<view>
			<view class="news-list" v-for="(item, index) in newsList" :key="index" @tap="gotoDetail(item.id)">
				<view class="news-icon"></view>
				<view class="news-info">
					<view class="news-title">
						<text>{{item.title}}</text>
					</view>
					<view class="news-time">
						<text>{{item.create_time}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue';
	export default {
		data() {
			return {
				title: '',
				isBack: false,
				isBlankBack: true,
				newsList: []
			}
		},
		components:{
			HeaderBar
		},
		onLoad() {
			this.getNewsList()
		},
		methods: {
			getNewsList(){
				this.uniRequest({
					url: 'notice',
					method: 'GET'
				}).then(res => {
					this.newsList = res.result.data
				})
			},
			gotoDetail(id){
				// 详细页
				uni.navigateTo({
					url: `/pages/my/newsdetail?id=${id}`
				})
			}
		},
		computed: {  
			i18n () {  
				this.title = this.$t('index').header.header18
				return this.$t('index')  
			}  
		}
	}
</script>

<style lang="scss">
.news{
	min-height: calc(100vh - 128rpx);
	background-color: #FFFFFF;
	.news-list{
		padding: 24rpx 30rpx;
		border-top: 2rpx solid #F6F7FB;
		display: flex;
		align-items: center;
		.news-icon{
			width: 46rpx;
			height: 46rpx;
			margin-right: 20rpx;
			background: url('../../static/images/icon44.png') no-repeat;
			background-size: contain;
		}
		.news-info{
			.news-title{
				font-size: 24rpx;
				color: #2D2D2D;
				width: calc(100vw - 142rpx);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space:nowrap;
			}
			.news-time{
				font-size: 20rpx;
				color: #8F92A1;
				margin-top: 16rpx;
			}
		}
	}
}
</style>
