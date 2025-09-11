import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const GeographyAndLandformsMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 地球・世界
    { english: 'globe', japanese: '地球' },
    { english: 'world', japanese: '世界' },
    { english: 'continent', japanese: '大陸' },
    { english: 'tropics', japanese: '熱帯地方' },
    { english: 'equator', japanese: '赤道' },
    { english: 'Arctic', japanese: '北極' },
    { english: 'Antarctic', japanese: '南極' },

    // 地域・場所
    { english: 'area', japanese: '地域' },
    { english: 'region', japanese: '地方、地域' },
    { english: 'district', japanese: '地区' },
    { english: 'zone', japanese: '地帯' },
    { english: 'land', japanese: '土地' },
    { english: 'ground', japanese: '地面' },
    { english: 'location', japanese: '位置' },
    { english: 'site', japanese: '用地、場所' },
    { english: 'spot', japanese: '地点、場所' },
    { english: 'map', japanese: '地図' },
    { english: 'address', japanese: '住所', linkNo: [54] },
    { english: 'border', japanese: '国境' },
    { english: 'route', japanese: 'ルート、道筋' },
    { english: 'path', japanese: '小道' },

    // 都市・町・村
    { english: 'capital', japanese: '首都' },
    { english: 'city', japanese: '都市' },
    { english: 'town', japanese: '町' },
    { english: 'village', japanese: '村' },
    { english: 'hometown', japanese: '故郷' },
    { english: 'neighborhood', japanese: '近所' },
    { english: 'suburb', japanese: '郊外' },
    { english: 'downtown', japanese: '中心街' },
    { english: 'countryside', japanese: '田舎' },

    // 風景・景色
    { english: 'landscape', japanese: '風景' },
    { english: 'scenery', japanese: '景色' },
    { english: 'viewpoint', japanese: '見晴らし台' },
    { english: 'sight', japanese: '景色、眺め' },

    // 地形（陸地）
    { english: 'mountain', japanese: '山' },
    { english: 'hill', japanese: '丘' },
    { english: 'summit', japanese: '頂上' },
    { english: 'peak', japanese: '峰' },
    { english: 'valley', japanese: '谷' },
    { english: 'canyon', japanese: '峡谷' },
    { english: 'cliff', japanese: '崖' },
    { english: 'slope', japanese: '坂、斜面' },
    { english: 'plain', japanese: '平野' },
    { english: 'field', japanese: '野原、畑', linkNo: [39] },
    { english: 'desert', japanese: '砂漠' },
    { english: 'island', japanese: '島' },
    { english: 'peninsula', japanese: '半島' },
    { english: 'volcano', japanese: '火山' },
    { english: 'forest', japanese: '森、森林' },
    { english: 'rock', japanese: '岩', linkNo: [38] },
    { english: 'cave', japanese: '洞窟' },

    // 水域・海岸
    { english: 'ocean', japanese: '大洋' },
    { english: 'sea', japanese: '海' },
    { english: 'river', japanese: '川' },
    { english: 'stream', japanese: '小川' },
    { english: 'lake', japanese: '湖' },
    { english: 'pond', japanese: '池' },
    { english: 'coast', japanese: '海岸' },
    { english: 'shore', japanese: '岸' },
    { english: 'beach', japanese: '砂浜' },
    { english: 'sand', japanese: '砂' },
    { english: 'bay', japanese: '湾' },
    { english: 'harbor', japanese: '港' },
    { english: 'dam', japanese: 'ダム' },
    { english: 'waterfall', japanese: '滝' },
    { english: 'spring', japanese: '泉', linkNo: [2] },
  ];

  return <WordMatrix data={data} columns={6} />;
};
