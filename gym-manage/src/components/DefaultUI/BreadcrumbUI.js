import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';

const BreadcrumbItem = Breadcrumb.Item;
/**
 * 面包屑基础组件UI
 * @author HeLang
 * @description 2018-01-05
 * @version     1.0.0
 * @constructor
 */
const BreadcrumbUI = ({ path }) => {
  let href = './#';
  return (
    <Breadcrumb>
      {
        path.map((item, index) => {
          if (path.length > 0) {
            href += `/${item.key}`;
            if (index === 0 || index === path.length - 1) {
              return (<BreadcrumbItem key={item}>{item.value}</BreadcrumbItem>)
            } else {
              return (<BreadcrumbItem key={item} href={href}>{item.value}</BreadcrumbItem>)
            }
          } else return null;
        })
      }
    </Breadcrumb>
  );
};

BreadcrumbUI.propTypes = {
  path: PropTypes.array.isRequired,
};

export default BreadcrumbUI;
