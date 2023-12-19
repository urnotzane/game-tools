#!/bin/bash

# 读取package.json文件并提取version字段的值
VERSION=$(cat package.json | jq -r '.version')

# 获取最新的git tag
LATEST_TAG=$(git describe --tags --abbrev=0)

# 比较VERSION和LATEST_TAG，如果它们不相等，则设置TAG_UPDATED为TRUE
if [ "v$VERSION" != "$LATEST_TAG" ]; then
  TAG_UPDATED=true
else
  TAG_UPDATED=false
fi

APP_NAME="Game Tools_"$VERSION"_x64"

# 输出VERSION和TAG_UPDATED的值
echo "VERSION=$VERSION" >> "$GITHUB_ENV"
echo "TAG_UPDATED=$TAG_UPDATED" >> "$GITHUB_ENV"
echo "APP_NAME=$APP_NAME" >> "$GITHUB_ENV"