'use client';

import { cn } from '@tier0/utils';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import _ from 'lodash';
import { FC, ReactNode } from 'react';
import { AntTag, TagTheme } from '../ant-tag';
import styles from './style.module.scss';

type TagRender = SelectProps['tagRender'];

export interface AntTagSelectProps extends SelectProps {
  tagIconRender?: (props: any) => ReactNode;
  tagTheme?: TagTheme;
}

export const AntTagSelect: FC<AntTagSelectProps> = ({ tagIconRender, tagTheme, className, ...restProps }) => {
  const tagRender: TagRender = (props) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    let tagIcon;

    if (_.isFunction(tagIconRender)) {
      tagIcon = tagIconRender(props);
    }
    return (
      <AntTag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        bordered={false}
        onClose={onClose}
        icon={tagIcon}
        theme={tagTheme}
        style={{
          marginInlineEnd: 4,
          marginTop: 2,
          marginBottom: 2,
          maxWidth: '100%',
        }}
      >
        {label}
      </AntTag>
    );
  };

  return (
    <Select
      className={cn(styles['AntTagSelect-wrapper'], className)}
      mode="multiple"
      tagRender={tagRender}
      {...restProps}
    />
  );
};
