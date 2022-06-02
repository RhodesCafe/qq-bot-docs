---
title: FAQ
sidebar: auto
---

::: tip
[有好问题想要添加？](/about/contact.html#faq)
:::

 ## 通用

 ###  1 一定要配置语料吗
 
 - 不用，所有开发者注册完机器人默认拥有“不校验语料 id”能力，发送的消息无需在后台报备。详见[官方文档:语料配置](https://bot.q.qq.com/wiki/#_9-1-%E8%AF%AD%E6%96%99%E9%85%8D%E7%BD%AE)

 ### 2.1 提审时的注意事项
 
 - 保持bot在线，且为正式环境

 ### 2.2 提审时是沙箱环境吗
 
 - 不是，需要在正式环境运行bot
 
 ### 2.3 无法提审 (机器人审核中或功能配置与测试报告没有修改)
 
 - 请确保 [功能配置与提审](https://q.qq.com/bot/#/developer/publish-config)中 `功能配置` 与 `自测报告` 均有修改，`功能指令` 可点击编辑后原样保存，`自测报告`需要改变excel内容（哪怕加一个空格也可以）
 - 如仍无法提审，可尝试修改 [资料卡设置](https://q.qq.com/bot/#/developer/data-card) 与 [机器人介绍](https://q.qq.com/bot/#/setting/bot-setting-detailed)
 - 在解决该问题后，如果觉得faq描述有误，可在[该帖子](https://qun.qq.com/qqweb/qunpro/share?_wv=3&_wwv=128&appChannel=share&inviteCode=WEhLR&appChannel=share&contentID=MQ2w&businessType=2&from=246610&biz=ka&shareSource=5)下反馈，这将有助于文档的完善

 ### 2.4 提审什么时候完成
 
 - 工作日 `24` 小时内审核，不支持催审，请耐心等待审核验收结果 [官方文档:自测报告](https://bot.q.qq.com/wiki/#_9-3-%E8%87%AA%E6%B5%8B%E6%8A%A5%E5%91%8A)
 - (下午四点前提审当日，下午四点后次日 (~~周六周日看运气~~))

 ### 2.5 有关提审的建议
  
 - 最好记录日志，根据日志和测试人员的反馈结果进行调整，不要凭空臆想
 - 自测报告中一定要完整展示机器人的功能和逻辑，不能因麻烦而不写
 
 
 ### 3 机器人支持@/at吗
 
 - 支持，示例：content:`这是一条AT<@114514>` 展示:`这是一条AT@田所浩二` 其中`114514` 为 用户`田所浩二`的User_id。 详见[官方文档:内嵌格式](https://bot.q.qq.com/wiki/develop/api/openapi/message/message_format.html#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F)
 
 ### 4 沙箱环境无法接收私信消息
 
 - 目前沙箱环境不支持私信，需切换到正式环境进行开发 [官方文档:私信消息](https://bot.q.qq.com/wiki/develop/api/gateway/direct_message.html#%E5%8F%91%E9%80%81%E6%97%B6%E6%9C%BA)
 
 ### 5 怎么重置私信
 
 - 电脑端右键私信会话头像，手机端长按，选择“删除对话”
 
 ### 6 主动消息什么时候不能发 (code 304022 推送消息时间限制)
 
 - 0:00 - 6:00
 
 ### 7 图片上传大小限制
 
 - 3m(url上传)
 
 ## Python SDK (官方)
 
 ###  1 AttributeError: module 'qqbot' has no attribute 'Token'
 
 - 检查目录下有无qqbot.py文件 [导入路径*(待编写)](/docs/thrid/python_import_path.html)
 - 使用 `pip install qq-bot` 安装，**注意是`qq-bot`不是`qqbot`**