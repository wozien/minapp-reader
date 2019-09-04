// 将评分的星数转为01数组
// 3 = > [1,1,1,0,0]
function startToArray(stars) {
  stars = +stars.toString().substring(0, 1);
  const res = [];
  for(let i = 1; i <=5; i++) {
    res.push(i <= stars ? 1 : 0);
  } 
  return res;
}

module.exports = {
  startToArray
}