const BASE = 'http://124.93.196.45:10001'

export const net = (opinions)=>{
	return new Promise((reslove,reject)=>{
		uni.request({
			url:BASE+opinions.url,
			method:opinions.method || 'GET',
			data:opinions.data || {},
			header:{
				'Authorization':uni.getStorageSync('token')
				
			},
			success: (res) => {
				if(res.data.code == 401){
					uni.removeStorageSync('token');
					uni.showModal({
					    title: '提示',
					    content: '登录认证已过期，请重新登录！',
					    success: function (res) {
					        if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login'
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					     }
					});
					
				}
				if(res.code==200){
					console.log('请求成功');
				}
				reslove(res.data)
			},
			fail: (err) => {
				uni.showToast({
					title:"接口请求失败",
					icon: 'none'
				})
				reject(err)
			}
		})
	})
}