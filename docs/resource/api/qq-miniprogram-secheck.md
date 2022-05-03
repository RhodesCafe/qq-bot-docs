---
title: qq小程序内容安全检测
---

 ## 说明
 
 - [文档地址](https://q.qq.com/wiki/develop/miniprogram/server/open_port/port_safe.html)
 - 免费
 - 来源：qq小程序
 - 功能：对文本/图片/音频/视频进行安全检查
 - 额度
   - 文字: 4000 次/分钟，2,000,000 次/天
   - 图片: 2000 次/分钟，200,000 次/天*（图片大小限制：1M）
   - 音频/视频: 2000 次/分钟，200,000 次/天；文件大小限制：单个文件大小不超过10M
 
 ## 接入流程
 
 ## step.1 获取 `access_token`
 
 `access_token` 是小程序全局唯一后台接口调用凭据，调用绝大多数后台接口时都需使用。开发者可以通过 getAccessToken 接口获取并进行妥善保存。  
 请根据官方文档部署：[文档地址](https://q.qq.com/wiki/develop/miniprogram/server/open_port/port_use.html#getaccesstoken)  
 部分请求参数说明：
  - appid -> [机器人后台](https://q.qq.com/bot/#/developer/developer-setting) - BotAppID
  - secret -> [机器人后台](https://q.qq.com/bot/#/developer/developer-setting) - 机器人密钥
  
::: tip
如果只在一个程序中调用接口，请忽视此tip  
access_token作为全局凭证，不应在单个程序中单独获取，应由中控服务器统一调控。[官方建议*](https://q.qq.com/wiki/develop/miniprogram/server/open_port/port_use.html#access-token-%E7%9A%84%E5%AD%98%E5%82%A8%E4%B8%8E%E6%9B%B4%E6%96%B0)  
[示例代码（php）](#access_token中控服务器示例代码)
:::
 
  ## step.2 调用接口
  
  [文档地址](https://q.qq.com/wiki/develop/miniprogram/server/open_port/port_safe.html)
  
::: warning
文本接口提交方式为 `application/json`  
图片接口提交方式为 `multipart/form-data`
:::
  
 ## access_token中控服务器示例代码
服务端：php
  
| 参数 | 类型 | 位置 | 说明 |
| ---- | --- | ---- | ---- |
| app_id | string | POST | BotAppID |
| timestamp | string | HEAD | 秒级时间戳，与服务器时间差不能大于60秒 |
| signature | string | HEAD | 签名串，用于验证身份 |

 ### signature计算
 
| 参数  | 说明 |
| ----- | ---- |
| timestamp |  秒级时间戳，与服务器时间差不能大于60秒，需与请求参数相同 |
| appid | BotAppID |
| secret | 机器人密钥 |
| token | 服务端代码中$token |

上述参数拼接在一起，通过SHA256计算得到signature
  
 signature计算示例（python）
 
 ```python
import hashlib
signature = hashlib.sha256(f'{timestamp}{appid}{secret}EXAMPLETOKEN!!!'.encode('utf-8')).hexdigest()
```
  
服务端代码
```php
<?php

$apps = array('Your AppID'=>'Your Secret');
$token = 'EXAMPLETOKEN!!!';

if (!isset($_POST['app_id']) or !isset($_SERVER['HTTP_TIMESTAMP']) or !isset($_SERVER['HTTP_SIGNATURE'])) {
    http_response_code(403);
    die();  // 验证参数是否存在
}

if (!isset($apps,$_POST['app_id'])) {
    http_response_code(403);
    die();  // 验证appid是否存在
}

if ($_SERVER['HTTP_SIGNATURE'] != hash("SHA256", $_SERVER['HTTP_TIMESTAMP'].$_POST['app_id'].$apps[$_POST['app_id']].$token)) {
    http_response_code(403);
    die('verify failed');  // 验证signature
}

if (!preg_match('/^\d+$/',$_SERVER['HTTP_TIMESTAMP']) or abs(time() - $_SERVER['HTTP_TIMESTAMP']) > 60) {
    http_response_code(403);  // 验证timestamp是否超时
    die();
}


if (file_exists($_POST['app_id'].'.json')) {
    $f = fopen($_POST['app_id'].'.json','r');
    $token = json_decode(fread($f,1024),true);
    fclose($f);  // 从缓存中读取access_token数据
} else {
    $token = array('access_token'=>'','expires'=>0,'errcode'=>114514);
}  // 初始化access_token数据


if (time() < $token['expires']) {
    die(json_encode($token));  // 如果再缓存期内，直接返回access_token数据
}



$ch = curl_init();  // 请求access_token
curl_setopt($ch, CURLOPT_URL,'https://api.q.qq.com/api/getToken?grant_type=client_credential&appid='.$_POST['app_id'].'&secret='.$apps[$_POST['app_id']]);
curl_setopt($ch , CURLOPT_RETURNTRANSFER ,true);
$result = json_decode(curl_exec($ch),true);
curl_close($ch);

if ($result['errcode']) {  // 如果errcode为真值，返回500与原始数据
    http_response_code(500);
    die(json_encode($result));
}

$result['expires'] = $result['expires_in'] + time();  // 计算到期的timestamp
unset($result['expires_in']);  // 简化原数据

print_r(json_encode($result));  // 返回

$f = fopen($_POST['app_id'].'.json','w');  // 将数据存至缓存
fwrite($f,json_encode($result));
fclose($f);

```