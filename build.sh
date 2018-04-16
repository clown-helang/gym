#!/bin/bash

echo "==========  Delete the old build files  =========="
cd gym-manage/
rm -rvf ./dist/gym-manage/*
rm -rvf ./dist/gym-manage.tar.gz

echo "==========  Start building [gym-manage]  =========="
cd gym-manage/
rm -rf yarn-error.log
yarn
yarnErrorFile="./yarn-error.log"
while [ -f "$yarnErrorFile" ]
do
echo "==========  The yarn installation failed and is trying to reinstall it  =========="
if cat $yarnErrorFile | grep ETIMEDOUT>/dev/null
then
  echo "==========  has ETIMEDOUT Error , retry yarn  =========="
  rm -rf yarn-error.log
  yarn
else
  echo "==========  other error , please contact the administrator   =========="
  rm -rf yarn-error.log
fi
yarnErrorFile="./yarn-error.log"
done
npm run build
echo "==========  Start change hash file [gym-manage]  =========="
indexFile=`find ./dist/ -name index.*.js`
headerFile=`find ./dist/ -name header.*.js`
siderFile=`find ./dist/ -name sider.*.js`
zhFile=`find ./dist/ -name zh-Hans-CN.*.js`
enFile=`find ./dist/ -name en-US.*.js`
indexCss=`find ./dist/ -name index.*.css`
headerCss=`find ./dist/ -name header.*.css`
siderCss=`find ./dist/ -name sider.*.css`
indexHtml="./dist/gym-manage/index.html"
indexEnHtml="./dist/gym-manage/index-eng.html"
configFile="config.js?v=$(date +%Y%m%d%H%M%S)"
#chinese language file hash change
/usr/bin/sed -i "s/index.css/${indexCss##*/}/g" $indexHtml
/usr/bin/sed -i "s/index.js/${indexFile##*/}/g" $indexHtml
/usr/bin/sed -i "s/zh-Hans-CN.js/${zhFile##*/}/g" $indexHtml
/usr/bin/sed -i "s/config.js/${configFile##*/}/g" $indexHtml
#english language file hash change
/usr/bin/sed -i "s/index.css/${indexCss##*/}/g" $indexEnHtml
/usr/bin/sed -i "s/index.js/${indexFile##*/}/g" $indexEnHtml
/usr/bin/sed -i "s/en-US.js/${enFile##*/}/g" $indexEnHtml
/usr/bin/sed -i "s/config.js/${configFile##*/}/g" $indexEnHtml
echo "==========  End change hash file [gym-manage]  =========="
echo "==========  [gym-manage] construction completion  =========="
cd ..

