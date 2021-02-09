<template>
	<view class="news">
		<header-bar :isBack="false" :isBlankBack="true" :title="i18n.header.header30"></header-bar>
		<view>
			<view class="news-list" v-for="(item, index) in newsList" :key="index" @tap="gotoDetail(item.id)">
				<view class="news-icon"></view>
				<view class="news-info">
					<view class="news-title">
						<text>{{item.content}}</text>
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
					url: 'getFeedbacks',
					method: 'GET'
				}).then(res => {
					this.newsList = res.result
				})
			},
			gotoDetail(id){
				// 详细页
				uni.navigateTo({
					url: `/pages/my/feedbackdetail?id=${id}`
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
		padding: 34rpx 30rpx;
		border-top: 1px solid #F6F7FB;
		display: flex;
		&:last-child{
			border-bottom: 1px solid #F6F7FB;
		}
		.news-icon{
			width: 72rpx;
			height: 72rpx;
			margin-right: 20rpx;
			background: url('../../static/images/icon44.png') no-repeat;
			background-size: contain;
		}
		.news-info{
			.news-title{
				font-size: $fontI;
				color: #2D2D2D;
				width: calc(100vw - 142rpx);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space:nowrap;
			}
			.news-time{
				font-size: $fontJ;
				color: $colorB;
			}
		}
	}
}
</style>
