import { SelectableButton } from '@/shared/components/selectable-button/SelectableButton';
import styles from './settingDialog.module.css';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

export type SettingSectionOption = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export type SettingSectionProps = {
  title: string;
  Icon?: LucideIcon;
  options: SettingSectionOption[];
  columns?: 2 | 3;
};

export const SettingSection = ({ title, Icon, options, columns = 2 }: SettingSectionProps) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.settingDialogHeading}>
        {Icon ? <Icon className={styles.icon} /> : null}
        <span>{title}</span>
      </h2>
      <div className={clsx(styles.buttonGrid, columns === 2 && styles.twoCols)}>
        {options.map((opt) => (
          <SelectableButton
            key={opt.label}
            className={clsx(opt.selected && styles.selected)}
            onClick={opt.onClick}
          >
            {opt.label}
          </SelectableButton>
        ))}
      </div>
    </div>
  );
};
