# Game Tools

## 设计
仿LOL S13的BP界面。

按照16:9、宽度为1024px计算，高度应为576px，使用[rem.js](https://github.com/lanmerry/rem.js)自动计算px。

## windows下管理员权限cmd无法切换盘符
1. 方法一
如果是切换到D盘就执行：
```bash
cd /D D:\User
```
2. 方法二
如果是切换到D盘就执行：
```bash
d:
```
## Rust不能直接执行非Windows系统命令
https://github.com/rust-lang/rust/issues/95957

## LOL物料
图标链接地址：https://ddragon.leagueoflegends.com/cdn/13.23.1/img/<group>/<full>
游戏加载界面：https://ddragon.leagueoflegends.com/cdn/img/<group>/loading/<id>_0.jpg

```json
/* Anivia (id: 34) */
"spells": [
  {
    "id": "FlashFrost",
    "name": "Flash Frost",
    "description": "Anivia brings her wings together and summons a sphere of ice that flies towards her opponents, chilling and damaging anyone in its path. When the sphere explodes it does moderate damage in a radius, stunning anyone in the area.",
    "image": {
      "full": "FlashFrost.png",
      "sprite": "spell0.png",
      "group": "spell",
      "x": 192,
      "y": 144,
      "w": 48,
      "h": 48
    }
  },
  ...
]
```

## win禁止运行pnpm或npm
```bash
pnpm : 无法加载文件 C:\Users\username\AppData\Roaming\npm\pnpm.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
```
管理员权限运行powershell，执行`set-ExecutionPolicy RemoteSigned`，输入Y，即可解决。

