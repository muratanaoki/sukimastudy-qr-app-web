import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const ShapeAndStructureMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 形状・図形
    { english: 'shape', japanese: '形' },
    { english: 'form', japanese: '形、形状' },
    { english: 'figure', japanese: '姿、形、図' },
    { english: 'pattern', japanese: '模様、パターン' },
    { english: 'color', japanese: '色' },

    // 基本図形
    { english: 'point', japanese: '点、先端', linkNo: [8, 57] },
    { english: 'line', japanese: '線', linkNo: [54] },
    { english: 'angle', japanese: '角度、角' },
    { english: 'side', japanese: '辺', linkNo: [31] },
    { english: 'circle', japanese: '円' },
    { english: 'square', japanese: '正方形' },
    { english: 'triangle', japanese: '三角形' },
    { english: 'cube', japanese: '立方体' },
    { english: 'sphere', japanese: '球、球体' },

    // 位置・構造・表面
    { english: 'surface', japanese: '表面' },
    { english: 'edge', japanese: '端、へり' },
    { english: 'structure', japanese: '構造、構成' },
    { english: 'film', japanese: '薄い膜', linkNo: [38] },
  ];

  return <WordMatrix data={data} columns={6} />;
};
