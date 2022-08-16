import {
	LicenseStatusEnum
} from '@/constant/driver.js'
import {
	personFormTip,
	driverFormTip
} from "@/constant/my.js"

// 证件允许失败的次数
export const ErrorMax = 3
let {
	validateModalContent,
	isValid
} = {}
let tipModalContent = []

// 获取表单身份证起止时间间隔
function getIDFormTimeSpan(startTime,endTime) {
	let year;
	const sTime = startTime.replace(/-/g,'/');
	const eTime = endTime.replace(/-/g,'/');
	let sYear = new Date(sTime).getFullYear();
	let eYear = new Date(eTime).getFullYear();
	let sMonth = new Date(sTime).getMonth() + 1;
	let eMonth = new Date(eTime).getMonth() + 1;
	let sDay = new Date(sTime).getDate();
	let eDay = new Date(eTime).getDate();
	year = eYear - sYear;
	// 计算年间距后，保证月份日期相等
	const IsEquel = sMonth === eMonth && sDay === eDay;
	return {year,IsEquel}
}
// 计算身份证有效期限
function getRightSpanTime(idCardNo,startTime) {
	let valid = 5;
	const year = +idCardNo.substring(6, 10);
	const month = +idCardNo.substring(10,12);
	const day = +idCardNo.substring(12,14);
	// 领证年份
	const getLiceDate = startTime?new Date(startTime.replace(/-/g,'/')):null;
	const getLiceYear = getLiceDate.getFullYear();
	const getLiceMonth = getLiceDate.getMonth() + 1;
	const getLiceDay = getLiceDate.getDate();
	// 领证年龄(领证年龄取整岁)
	let getLicenseAge = getLiceYear - year;
	if(getLiceMonth < month) {
		getLicenseAge--
	} else if(getLiceMonth === month) {
		if(getLiceDay < day) {
			getLicenseAge--
		}
	}
	/* 年龄小于16，有效期5年
    年龄大于等于16，小于等于25，有效期10年
    年龄大于等于26，小于等于45，有效期20年
    年龄大于等于46，长期 */
	if(getLicenseAge < 0) {
		valid = 0;
	} else if(getLicenseAge < 16) {
		valid = 5;
	} else if(getLicenseAge >= 16 && getLicenseAge <=25) {
		valid = 10;
	} else if(getLicenseAge >= 26 && getLicenseAge <= 45) {
		valid = 20;
	} else {
		// 长期
		valid = 21
	}
	return valid
}
function getIdCardTimeValidateTip (startTime, endTime, idCardNo) {
	if(startTime && new Date(startTime.replace(/-/g,'/')) >= new Date()) {
		return {
			validateModalContent: "身份证有效期开始日期不能大于当前日期",
		}
	}

	if (endTime && startTime && new Date(endTime.replace(/-/g,'/')) <= new Date(startTime.replace(/-/g,'/'))) {
		return {
			validateModalContent: "身份证有效期结束日期必须大于开始日期",
		}
	}

	if(startTime && endTime) {
		const validTime = getRightSpanTime(idCardNo, startTime)
		if(validTime === 0) {
			return {
				validateModalContent: "身份证有效期开始时间应大于身份证出生时间",
			}
		}
		if(endTime !== '长期') {
			const {year:spanTime ,IsEquel} = getIDFormTimeSpan(startTime, endTime)
			// 起止时间必须大于5年
			if(spanTime < 5) {
				return {
					validateModalContent: "身份证有效期起止时间间隔必须等于或大于5年",
				}
			}
			// 短期
			if(validTime < 21) {
				if(!(validTime === spanTime && IsEquel)) {
					return {
						validateModalContent: `您的身份证有效期应为${validTime}年`,
					}
				}
			// 长期
			} else {
				return {
					validateModalContent: '您的身份证有效期应为长期',
				}
			}
		} else {
			// 选中长期且不为长期
			if(validTime !== 21) {
				return {
					validateModalContent: `您的身份证有效期应为${validTime}年`,
				}
			}
		}
	}
	return {validateModalContent: ''}
}

// 身份认证图片/表单校验
export const validate = async (data, tipStatistics) => {
	// 未认证/审核未通过，证件必须重新传，审核中/即将到期证件不需要重新传即可提交，身份证和驾驶证均适用
	// 校验优先级，身份证必传->身份证清晰性->身份证表单->驾驶证必传->驾驶证清晰性->驾驶证表单

	// 校验身份证正面是否上传
	if (data.idCardStatus === LicenseStatusEnum.None) {
		if (!data.cardFrontUpload || data.cardFrontUpload.length === 0) {
			validateModalContent = "请上传身份证人像面"
			isValid = false
			return
		}
	}
	// 审核未通过时，提示信息是“请重新上传***”
	if (data.idCardStatus === LicenseStatusEnum.NotPass) {
		if (!data.cardFrontUpload || data.cardFrontUpload.length === 0) {
			validateModalContent = "请重新上传身份证人像面"
			isValid = false
			return
		}
	}
	// 校验身份证正面是否清晰
	if (!tipStatistics
		.cardFrontOcrSuccess && tipStatistics.cardFrontCount > 0 && tipStatistics.cardFrontCount < ErrorMax) {
		validateModalContent = "请上传清晰身份证人像面"
		isValid = false
		return
	}

	console.log(data,'999999999');
	// 校验身份证反面是否上传
	if (data.idCardStatus === LicenseStatusEnum.None) {
		if (!data.cardBackUpload || data.cardBackUpload.length === 0) {
			validateModalContent = "请上传身份证国徽面"
			isValid = false
			return
		}
	}
	// 审核未通过时，提示信息是“请重新上传***”
	if (data.idCardStatus === LicenseStatusEnum.NotPass) {
		if (!data.cardBackUpload || data.cardBackUpload.length === 0) {
			validateModalContent = "请重新上传身份证国徽面"
			isValid = false
			return
		}
	}
	// 校验身份证反面是否清晰
	if (!tipStatistics
		.cardBackOcrSuccess && tipStatistics.cardBackCount > 0 && tipStatistics.cardBackCount < ErrorMax) {
		validateModalContent = "请上传清晰身份证国徽面"
		isValid = false
		return
	}

	// 校验身份证表单
	if (!data.personFormDisabled) {
		for (let index = 0; index < personFormTip.length; index++) {
			let key = personFormTip[index].key
			let {
				tip
			} = personFormTip[index]
			// 校验必填
			if (!data[key]) {
				validateModalContent = tip
				isValid = false
				return
			}
			// 校验姓名格式
			if (!/^[\u4e00-\u9fa5·]{1,18}$/.test(data.driverName)) {
				validateModalContent = '请输入正确的姓名格式'
				isValid = false
				return
			}
			// 校验身份证号格式
			if (!uni.$u.test.idCard(data.idCardNo)) {
				validateModalContent = '请输入正确的身份证号格式'
				isValid = false
				return
			}
		}
	}

	const {validateModalContent:content} = await getIdCardTimeValidateTip(data.idCardBeginDate, data.idCardEndDate, data.idCardNo);
	if(content) {
		validateModalContent = content
		isValid = false
		return
	}

	/* // 身份证开始时间必须小于当前时间
	if(data.idCardBeginDate&&new Date(data.idCardBeginDate.replace(/-/g,'/')) >= new Date()) {
		validateModalContent = "身份证有效期开始日期不能大于当前日期"
		isValid = false
		return
	} */

	/* // 校验身份证结束日期是否大于身份证开始日期
	if (data.idCardEndDate && data.idCardBeginDate && new Date(data.idCardEndDate.replace(/-/g,'/')) <= new Date(data.idCardBeginDate.replace(/-/g,'/'))) {
		validateModalContent = "身份证有效期结束日期必须大于开始日期"
		isValid = false
		return
	} */

	// 身份证有效期校验规则
	/* if(data.idCardBeginDate && data.idCardEndDate) {
		const validTime = getRightSpanTime(data.idCardNo, data.idCardBeginDate)
		if(validTime === 0) {
			validateModalContent = "身份证有效期开始时间应大于身份证出生时间"
			isValid = false
			return
		}
		if(data.idCardEndDate !== '长期') {
			const {year:spanTime ,IsEquel} = getIDFormTimeSpan(data.idCardBeginDate, data.idCardEndDate)
			// 起止时间必须大于5年
			if(spanTime < 5) {
				validateModalContent = "身份证有效期起止时间间隔必须等于或大于5年"
				isValid = false
				return
			}
			// 短期
			if(validTime < 21) {
				if(!(validTime === spanTime && IsEquel)) {
					validateModalContent = `您的身份证有效期应为${validTime}年`
					isValid = false
					return
				}
				// if(validTime !== spanTime && !IsEquel) {
				// 	validateModalContent = `您的身份证有效期应为${validTime}年`
				// 	isValid = false
				// 	return
				// }
			// 长期
			} else {
				validateModalContent = '您的身份证有效期应为长期'
				isValid = false
				return
			}
		} else {
			// 选中长期且不为长期
			if(validTime !== 21) {
				validateModalContent = `您的身份证有效期应为${validTime}年`;
				isValid = false
				return
			}
		}
	} */

	// 校验驾驶证正面是否上传
	if (data.driverCardStatus === LicenseStatusEnum.None) {
		if (!data.driverFrontUpload || data.driverFrontUpload.length === 0) {
			validateModalContent = "请上传驾驶证正本"
			isValid = false
			return
		}
	}
	// 审核未通过时，提示信息是“请重新上传***”
	if (data.driverCardStatus === LicenseStatusEnum.NotPass) {
		if (!data.driverFrontUpload || data.driverFrontUpload.length === 0) {
			validateModalContent = "请重新上传驾驶证正本"
			isValid = false
			return
		}
	}
	// 校验驾驶证正面是否清晰
	if (!tipStatistics
		.driverFrontOcrSuccess && tipStatistics.driverFrontCount > 0 && tipStatistics.driverFrontCount < ErrorMax) {
		validateModalContent = "请上传清晰驾驶证正本"
		isValid = false
		return
	}

	// 校验驾驶证反面是否上传
	if (data.driverCardStatus === LicenseStatusEnum.None) {
		if (!data.driverBackUpload || data.driverBackUpload.length === 0) {
			validateModalContent = "请上传驾驶证副页"
			isValid = false
			return
		}
	}
	// 审核未通过时，提示信息是“请重新上传***”
	if (data.driverCardStatus === LicenseStatusEnum.NotPass) {
		if (!data.driverBackUpload || data.driverBackUpload.length === 0) {
			validateModalContent = "请重新上传驾驶证副页"
			isValid = false
			return
		}
	}

	// 校验驾驶证表单
	if (!data.driverFormDisabled) {
		for (let index = 0; index < driverFormTip.length; index++) {
			let key = driverFormTip[index].key
			let {
				tip
			} = driverFormTip[index]
			// 校验必填
			if (!data[key]) {
				validateModalContent = tip
				isValid = false
				return
			}
			// 校验驾驶证号格式
			if (!uni.$u.test.idCard(data.driverLicense)) {
				validateModalContent = '请输入正确的驾驶证号格式'
				isValid = false
				return
			}
		}
	}

	isValid = true
}

export const getValid = () => {
	return {
		validateModalContent,
		isValid
	}
}

// 校验一致性
export const validateConsistent = (data, tipStatistics) => {
	let promise = new Promise((resolve, reject) => {
		// 校验身份证与驾驶证号是否一致，不阻断
		if (data.idCardNo && data.driverLicense && data.idCardNo !== '' && data
			.driverLicense !== '' && data.idCardNo !==
			data.driverLicense) {
			tipModalContent.push('驾驶证和身份证非同一人')
		}

		// 校验驾驶证准驾车型与平台对应准驾车型（载货类）是否符合，不阻断
		if (!tipStatistics.isDriverTypeSame) {
			tipModalContent.push('驾驶证准驾车型与平台对应准驾车型（载货类）不符')
		}
	})

	return {
		promise,
		tipModalContent
	}
}

// 校验身份证时间正确性
export const idCardTimeValidate = getIdCardTimeValidateTip
