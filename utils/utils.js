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

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  startToArray,
  convertToCastString,
  convertToCastInfos
}