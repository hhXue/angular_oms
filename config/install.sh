#!/bin/bash
build_number=$1
build_id=$2
omsweb_path=/var/local/omsweb/omsweb.$build_number.$build_id

[ -f $omsweb_path/app/appconfig.js ] && rm $omsweb_path/app/appconfig.js

#获取脚本当前运行的服务器名称，处理在不同服务器上的特殊配置
hostname=`hostname`
case  $hostname in
'dev3')
  echo  $hostname'13 test'
ln -s $omsweb_path/config/appconfig_dev.js  $omsweb_path/app/appconfig.js
;;

'stars-oms-db-001'|'stars-oms-db-002')
  echo  $hostname' test'
  ln -s $omsweb_path/config/appconfig_test.js  $omsweb_path/app/appconfig.js
;;
*)
  echo  $hostname
ln -s $omsweb_path/config/appconfig.js  $omsweb_path/app/appconfig.js
;;
esac

chown -R www-data:www-data  $omsweb_path
web_path="/var/www/omsweb"
if [ -L $web_path ];then
  ln -sfn $(readlink -f "/var/www/omsweb") "/var/www/omsweb_last"
  ln -sfn  $omsweb_path $web_path
  echo "$omsweb_path   $web_path  ln -s  :"$?
else
  if [ -d $web_path ];then
	  mv -f $web_path "/var/local/omsweb/omsweb_lagacy"
	  ln -sfn  $omsweb_path $web_path
	  ln -sfn "/var/local/omsweb/omsweb_lagacy" "/var/www/omsweb_last"
  else
	ln -s  $omsweb_path $web_path
  fi
fi

nginx=/etc/nginx/sites-enabled/omsweb.conf
if [ -f $nginx ];then
 rm $nginx
fi

if [ $hostname == 'stars-oms-db-001' -o $hostname == 'stars-oms-db-002' ]; then
  ln -s $omsweb_path/config/omsweb_test.conf $nginx
else
  ln -s $omsweb_path/config/omsweb.conf $nginx
fi

/etc/init.d/nginx reload
rm -rf $omsweb_path.tar.gz
echo $omsweb_path".tar.gz rm -rf:"$?
