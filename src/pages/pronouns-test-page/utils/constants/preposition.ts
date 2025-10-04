import { Clock, Hand, Lightbulb, MapPin, Navigation } from 'lucide-react';
import { EnglishWordGroupBase } from './const';

const PREPOSITION_DATA_BASE: EnglishWordGroupBase[] = [
  {
    id: 'position',
    groupNo: 1,
    title: '位置',
    abbr: '位置',
    icon: MapPin,
    items: [],
  },
  {
    id: 'direction',
    groupNo: 2,
    title: '方向',
    abbr: '方向',
    icon: Navigation,
    items: [],
  },
  {
    id: 'time',
    groupNo: 3,
    title: '時間',
    abbr: '時間',
    icon: Clock,
    items: [],
  },
  {
    id: 'means',
    groupNo: 4,
    title: '手段',
    abbr: '手段',
    icon: Hand,
    items: [],
  },
  {
    id: 'logic',
    groupNo: 5,
    title: '論理',
    abbr: '論理',
    icon: Lightbulb,
    items: [],
  },
];
