//获取播放历史歌曲
export function _historySong(songName, songId, songSheetId = null) {
	//1.将参数数据进行包装；
	const song = {
		songName,
		songId,
		songSheetId
	}
	//2.获取本地缓存
	let songArr = uni.getStorageSync('song');
	//3.判断本地是否有这个缓存
	if (!songArr) {
		//4.没有这个缓存，此时songArr没有值，可以给songArr赋值一个[参数数据]，并把参数传递过去；
		songArr = [song]
		//5.将数据添加到缓存中
		uni.setStorageSync('song', songArr);
		// console.log(songarr)
	} else {
		//6.本地有这个缓存，查询数组中是否已经存在该数据对象
		let repeatIndex = songArr.findIndex((value, index) => value.songId === songId)
		//7.判断是否有此数据
		if (repeatIndex !== -1) {
			//有则删除此数据
			songArr.splice(repeatIndex, 1)
		}
		//8.点击的数据统一添加到数组中；
		songArr.unshift(song)
	}
	//9.并且最后将数据添加到缓存中
	uni.setStorageSync('song', songArr)
}


