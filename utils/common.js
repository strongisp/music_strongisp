// 时间戳转换封装
export function _formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	let o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds()
	};

	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + "";
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
		}
	}

	return fmt;
}

function padLeftZero(str) {
	return ("00" + str).substr(str.length);
}

//时间转换，（秒 转 分钟 秒）
export function _timeSwitch(value) {
	//将获取到的秒数，只保留整数
	let result = parseInt(value)
	//创建容器res
	let res = '';
	//分钟
	let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
	//秒
	let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
	//判断分钟
	if (m == '00') res += `00:`
	if (m !== '00') res += `${m}:`;
	res += `${s}`;
	return res===0?'00:00':res
}
