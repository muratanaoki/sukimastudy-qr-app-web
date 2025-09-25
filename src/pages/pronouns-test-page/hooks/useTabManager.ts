import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { PronounGroup } from '../utils/type';

export const useTabManager = (data: PronounGroup[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URLから初期タブ値を取得
  const getInitialTab = (): number => {
    const tabParam = searchParams.get('tab');
    if (tabParam && data) {
      const tabNumber = parseInt(tabParam, 10);
      const foundGroup = data.find(group => group.groupNo === tabNumber);
      if (foundGroup) {
        return tabNumber;
      }
    }
    return data && data.length > 0 ? data[0].groupNo : 0;
  };

  const [activeGroupNo, setActiveGroupNo] = useState<number>(getInitialTab);

  // URLパラメータが変更されたときにタブを同期
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && data) {
      const tabNumber = parseInt(tabParam, 10);
      const foundGroup = data.find(group => group.groupNo === tabNumber);
      if (foundGroup && foundGroup.groupNo !== activeGroupNo) {
        setActiveGroupNo(foundGroup.groupNo);
        return;
      }
    }

    // データが変わってアクティブタブが存在しなくなった場合のフォールバック
    if (data && data.length > 0) {
      const exists = data.some(group => group.groupNo === activeGroupNo);
      if (!exists) {
        setActiveGroupNo(data[0].groupNo);
      }
    }
  }, [searchParams, data, activeGroupNo]);

  // タブ変更とURL更新を同時に行うハンドラー
  const changeTab = useCallback((newGroupNo: number) => {
    setActiveGroupNo(newGroupNo);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('tab', newGroupNo.toString());
      return newParams;
    });
  }, [setSearchParams]);

  return {
    activeGroupNo,
    changeTab,
  };
};