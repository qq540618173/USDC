<template>
	<view class="machine">
		<header-bar :title="i18n.header.header28"></header-bar>
		<view class="tab-title">
			<view class="tab-title-item" :class="{active: type==1}" @tap="getData(1)">
				<text>{{i18n.index.mining12}}</text>
			</view>
			<view class="tab-title-item" :class="{active: type==2}" @tap="getData(2)">
				<text>{{i18n.index.mining13}}</text>
			</view>
		</view>
		<view class="container">
			<view class="tab-content">
				<scroll-view class="scroll-wrap" scroll-y="true" v-show="type == 1" @scrolltolower="moreLoad(type)">
					<view class="list" v-for="(item, index) in dataList1" :key="index" @tap="gotoPage(item.order)">
						<view class="top">
							<text>{{item.create_time}}</text>
						</view>
						<view class="mid wrap">
							<text>{{i18n.index['mining' + item.combo_id]}}</text>
							<text>{{i18n.index.mining9}}</text>
						</view>
						<view class="bot wrap">
							<text class="amount">{{item.actual_money}}QUSD</text>
							<text :class="'color' + item.status">{{i18n.index['status' + item.status]}}</text>
						</view>
					</view>
					<view class="nomore" v-if="dataList1.length == total1 && dataList1.length != 0">
						<text>{{i18n.index.mining14}}</text>
					</view>
				</scroll-view>
				<scroll-view class="scroll-wrap" scroll-y="true" v-show="type == 2" @scrolltolower="moreLoad(type)">
					<view class="list" v-for="(item, index) in dataList2" :key="index" @tap="gotoPage(item.order)">
						<view class="top">
							<text>{{item.create_time}}</text>
						</view>
						<view class="mid wrap">
							<text>{{i18n.index['mining' + item.combo_id]}}</text>
							<text>{{i18n.index.mining9}}</text>
						</view>
						<view class="bot wrap">
							<text class="amount">{{item.actual_money}}QUSD</text>
							<text class="color2">{{i18n.index.status2}}</text>
						</view>
						<view class="profit">
							<view class="wrap text">
								<text>{{i18n.index.mining10}}</text>
								<text>{{i18n.index.mining11}}</text>
							</view>
							<view class="wrap number">
								<text>{{item.awrad}}QUSD</text>
								<text>{{item.released}}QUSD</text>
							</view>
						</view>
					</view>
					<view class="nomore" v-if="dataList2.length == total2 && dataList2.length != 0">
						<text>{{i18n.index.mining14}}</text>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '../../components/header-bar.vue';
	export default {
		data() {
			return {
				type: 1,
				page1: 1,
				page2: 1,
				size: 10,
				total1: 0,
				total2: 0,
				dataList1: [],
				dataList2: [],
				isLoad: [],
			}
		},
		components:{
			HeaderBar
		},
		onLoad(option) {
			this.type = option.type
			this.getData(option.type)
		},
		methods: {
			getData(type){
				let { size, isLoad } = this
				let page = this['page' + type]
				this.type = type
				if(isLoad.indexOf(type) > -1){
					return
				} else {
					this.isLoad.push(Number(type))
				}
				this.uniRequest({
					url: 'mill',
					method: 'GET',
					data: {
						type,
						page,
						size
					}
				}).then(res => {
					this['dataList'+ type] = res.result.data
					this['total'+ type] = res.result.count
				})
			},
			moreLoad(type){
				if(this['total'+ type] > this['dataList'+ type].length){
					this['page'+type] += 1
					let size = this.size
					let page = this['page' + type]
					this.uniRequest({
						url: 'mill',
						method: 'GET',
						data: {
							type,
							page,
							size
						}
					}).then(res => {
						this['dataList'+ type] = this['dataList'+ type].concat(res.result.data)
					})
				}
			},
			gotoPage(order){
				uni.navigateTo({
					url: `miningdetails?order=${order}`
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
.machine{
	.tab-title{
		width: 100%;
		background-color: $colorC;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 128rpx;
		left: 0;
		.tab-title-item{
			flex: 1;
			text-align: center;
			line-height: 100rpx;
			font-size: $fontH;
			color: $colorE;
			position: relative;
			&.active{
				color: $colorA;
				&::after{
					content: "";
					display: block;
					width: 100rpx;
					height: 4rpx;
					border-radius: 4rpx;
					background-color: #5522FA;
					position: absolute;
					left: 50%;
					top: 80rpx;
					margin-left: -50rpx;
				}
			}
		}
	}
	.container{
		.tab-content{
			padding-top: 100rpx;
			.scroll-wrap{
				width: 100%;
				height: calc(100vh - 288rpx);
				.nomore{
					font-size: $fontI;
					color: $colorE;
					text-align: center;
				}
			}
			.list{
				background-color: $colorC;
				border-radius: 8rpx;
				padding: 28rpx;
				margin-bottom: 24rpx;
				.top{
					font-size: $fontJ;
					color: $colorA;
				}
				.mid{
					font-size: $fontJ;
					color: $colorA;
					margin-top: 16rpx;
				}
				.bot{
					margin-top: 4rpx;
					.amount{
						font-size: $fontG;
						color: $colorG;
					}
					.color0{
						font-size: $fontH;
						color: $colorA;
					}
					.color1{
						font-size: $fontH;
						color: #FF4436;
					}
					.color2{
						font-size: $fontH;
						color: #33D38A;
					}
					.color3{
						font-size: $fontH;
						color: #8c2fee;
					}
				}
				.wrap{
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.profit{
					margin-top: 34rpx;
					padding-top: 34rpx;
					background: url('../../static/images/icon19.png') left top repeat-x;
					.text{
						font-size: $fontJ;
						color: $colorA;
					}
					.number{
						font-size: $fontG;
						color: $colorG;
						margin-top: 4rpx;
					}
				}
			}
		}
	}
}
</style>
