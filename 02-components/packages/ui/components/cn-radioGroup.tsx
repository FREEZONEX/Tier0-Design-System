import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface Item {
  value: string;
  label: string;
}

interface CnRadioGroupProps {
  items: Item[];
  value: string;
  onChange: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
}

const CnRadioGroup: React.FC<CnRadioGroupProps> = ({ items, value, onChange, direction = 'vertical' }) => {
  // 用 gap 控间距（12px）。注意：RadioGroup 根节点自带 `grid gap-3`，若再叠 `space-y-*` 两者不冲突会
  // 叠加（gap 12px + margin 8px ≈ 20px）导致间距过宽；这里统一走 gap-3，与根节点一致，得干净的 12px。
  const groupClass = direction === 'horizontal' ? 'flex flex-row gap-3' : 'flex flex-col gap-3';

  return (
    <RadioGroup value={value} onValueChange={onChange} className={groupClass}>
      {items.map((item) => (
        <div key={item.value} className="flex items-center space-x-1">
          <RadioGroupItem value={item.value} id={item.value} />
          <span className="text-sm">{item.label}</span>
        </div>
      ))}
    </RadioGroup>
  );
};

export default CnRadioGroup;
