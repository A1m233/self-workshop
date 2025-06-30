export interface TodoType
{
	isFinished: boolean,
  content: string,
  expiration: number, // 时间戳？
  id: number,
  hasRemind: boolean,
};

export type PageType = '即将到期' | '到期' | '已完成' | '未将到期且未完成';