<?php
/*
videoName  		视频名称
videoStatus 		频道状态
videoPlayType 		频道类型
videoUrl   		URL [[0]=>['urlTitle'=>'ss','urlLocation'=>'url']]
videoDescription  	频道描述
videoImage  		频道图片
videoTvImage 		电视图片
videoShareImage 	分享图片
videoEpg 		频道EPG
videoCp 		所属CP
videoArea 		所属地区
videoFirstChar  	频道首字母
videoScore    		频道评分
videoCategory  		频道分类
videoTag   		频道标签
videoApp  		选择应用
*/

$json = [
	'videoNmae' => 'videoName',
	'videoStatus' => '1',
	'videoPlayType' => '1',
	'videoUrl' => [
		[
			'urlTitle'=>'ss',
			'urlLocation'=> 'url',
			'urlSort' => '1'
		],
		[
			'urlTitle'=>'ssa',
			'urlLocation'=> 'urlaas',
			'urlSort' => '2'
		]
	],
	'videoDescription' => 'videoDescription',
	'videoImage' => 'http://image',
	'videoTvImage' => 'http://image',
	'videoShareImage' => 'http://image',
	'videoEpg' => 1,
	'videoCp' => [1,12,23],
	'videoArea' => [12,123,123],
	'videoFirstChar' => 'C',
	'videoScore' => '3.6',
	'videoCategory' => ['1,23,23'],
	'videoTag' => [123,123],
	'videoApp' => [123,123],	
];
echo json_encode($json);
//{"videoNmae":"videoName","videoStatus":"1","videoPlayType":"1","videoUrl":[{"urlTitle":"ss","urlLocation":"url","urlSort":"1"},{"urlTitle":"ssa","urlLocation":"urlaas","urlSort":"2"}],"videoDescription":"videoDescription","videoImage":"http:\/\/image","videoTvImage":"http:\/\/image","videoShareImage":"http:\/\/image","videoEpg":1,"videoCp":[1,12,23],"videoArea":[12,123,123],"videoFirstChar":"C","videoScore":"3.6","videoCategory":["1,23,23"],"videoTag":[123,123],"videoApp":[123,123]}


$array = ['fdsaf'=>'1232','123ss'=>'12321'];
var_dump(key($array));