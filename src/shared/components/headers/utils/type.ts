import { SectionKey } from './enum';

export type NavItem = {
  label: string;
  to: string;
};

export type NavSection = {
  key: SectionKey;
  title: string;
  items: NavItem[];
};
