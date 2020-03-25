const express = require("express");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

app.get("/", function(req, res) {
  var a = "324";
  var b = "581";
  var arr1 = [];
  var arr2 = [];
  var result = "";
  var test = [];
  // 1.แยกข้อความออกเป็น row กับ col
  for (x = 0; x < a.length; x++) {
    arr1.push(a[x]);
  }
  for (y = 0; y < b.length; y++) {
    arr2.push(b[y]);
  }
  // 2.เอาค่าแต่ละตัวมาคูณกัน [row*col]
  var resArr = multiEachCol(arr1, arr2);
  // 3.เอาผลที่ได้แต่ละตัวมาแยกใน arr ใหม่
  var splArr = splitResult(resArr);
  console.log(splArr);
  //TODO 4.เอา arr ใหม่ มาจัดวาง เพื่อเอาแต่ละตัวมา บวก ตามลำดับ
  var first_digit = splArr[0][0];
  var last_digit = splArr[splArr.length - 1][1];
  var next_last1 =
    parseInt(splArr[splArr.length - 1][0]) +
    parseInt(splArr[splArr.length - 2][1]) +
    parseInt(splArr[splArr.length - 4][1]);
  var next_last2 =
    parseInt(splArr[splArr.length - 2][1]) +
    parseInt(splArr[splArr.length - 3][1]) +
    parseInt(splArr[splArr.length - 4][0]) +
    parseInt(splArr[splArr.length - 5][1]) +
    parseInt(splArr[splArr.length - 7][1]);
  var next_last3 =
    parseInt(splArr[splArr.length - 3][0]) +
    parseInt(splArr[splArr.length - 5][0]) +
    parseInt(splArr[splArr.length - 6][1]) +
    parseInt(splArr[splArr.length - 7][0]) +
    parseInt(splArr[splArr.length - 8][1]);

  var next_last4 =
    parseInt(splArr[splArr.length - 6][0]) +
    parseInt(splArr[splArr.length - 8][0]) +
    parseInt(splArr[splArr.length - 9][1]);

  // var sum=0;
  // for (i = splArr.length - 1; i >= 0; i--) {
  //   var carry = 0;
  //   var round = 0;
  //   sum += parseInt(splArr[splArr.length - i][1])
  //   carry=sum%10;
  //   round=sum/10;
  // }
  // console.log(sum);

  // 5.รวม str แต่ละมาเรียงกัน = result
  result =first_digit +next_last4 +next_last3 +next_last2 +next_last1 + last_digit;

  res.send({ result: result });
});

function multiEachCol(arr1, arr2) {
  var result = [];
  var con2str = "";
  for (i = 0; i < arr2.length; i++) {
    for (j = 0; j < arr1.length; j++) {
      if (arr1[i] * arr2[j] > 9) {
        con2str = (arr1[i] * arr2[j]).toString();
      } else {
        con2str = "0" + (arr1[i] * arr2[j]).toString();
      }
      result.push(con2str);
    }
  }
  return result;
}

function splitResult(mulRes) {
  var result = [];
  for (i = 0; i < mulRes.length; i++) {
    var val = mulRes[i];
    var arr = [];
    for (j = 0; j < val.length; j++) {
      arr.push(val[j]);
    }
    result.push(arr);
  }
  return result;
}

app.listen(port, () => console.log(`listening on port ${port}!`));
