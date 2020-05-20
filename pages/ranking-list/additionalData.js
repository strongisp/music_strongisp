export const requestAll = [{name: '官方榜',idx: 3,updateTime: '每日更新',s:1},{name: '官方榜',idx: 0,updateTime: '每日更新',s:2},{name: '官方榜',idx: 1,updateTime: '每周四更新',s:3},
				{name: '官方榜',idx: 2,updateTime: '每周四更新',s:4},{name: '官方榜',idx: 4,updateTime: '每周五更新',s:5},
				{name: '推荐榜',idx: 23,updateTime: '每周五更新',s:1},{name: '推荐榜',idx: 25,updateTime: '每周一更新',s:2},{name: '推荐榜',idx: 32,updateTime: '每周四更新',s:3},
				{name: '推荐榜',idx: 15,updateTime: '每周三更新',s:4},{name: '推荐榜',idx: 26,updateTime: '每周一更新',s:5},{name: '推荐榜',idx: 22,updateTime: '每周三更新',s:6},
				{name: '全球榜',idx: 6,updateTime: '每周三更新',s:1},{name: '全球榜',idx: 5,updateTime: '每周一更新',s:2},{name: '全球榜',idx: 21,updateTime: '每日更新',s:3},
				{name: '全球榜',idx: 10,updateTime: '每周一更新',s:4},{name: '全球榜',idx: 8,updateTime: '每周五更新',s:5},{name: '全球榜',idx: 29,updateTime: '每周四更新',s:6},
				{name: '更多榜',idx: 24,updateTime: '每周四更新',s:1},{name: '更多榜',idx: 28,updateTime: '每周四更新',s:2},{name: '更多榜',idx: 27,updateTime: '每周一更新',s:3},
				{name: '更多榜',idx: 18,updateTime: '每周一更新',s:4},{name: '更多榜',idx: 20,updateTime: '每周五更新',s:5},{name: '更多榜',idx: 33,updateTime: '每周一更新',s:6}
				]
export let sortS = function(obj1, obj2) {
									let val1 = obj1.s;
									let val2 = obj2.s;
									if (val1 < val2) {
										return -1;
									} else if (val1 > val2) {
										return 1;
									} else {
										return 0;
									}
								}