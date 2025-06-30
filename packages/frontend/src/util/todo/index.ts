import { PageType, TodoType } from "@/types/todo";

function isDue(timestamp: number)
{
  const diff = timestamp - Date.now();
  if (diff < 0)return false;
  return diff < 1000 * 60 * 60 * 24;
};
function isExpired(timestamp: number)
{
  return timestamp < Date.now();
}
export function todoTypeChecker(pageType: PageType, element: TodoType)
{
  if (pageType === '即将到期')
  {
    return !element.isFinished && isDue(element.expiration);
  }
  if (pageType === '到期')
  {
    return !element.isFinished && isExpired(element.expiration);
  }
  if (pageType === '已完成')
  {
    return element.isFinished;
  }
  if (pageType === '未将到期且未完成')
  {
    return !element.isFinished && !isExpired(element.expiration) && !isDue(element.expiration);
  }
};