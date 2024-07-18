import { ThemeConfig } from 'antd';

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#5a7afa',
    colorLink: '#5a7afa',
    colorPrimaryBg: '#e2e2e2',
  },
  components: {
    Layout: {
      colorBgLayout: '#FFFFFF',
      siderBg: '',
    },
    Menu: {
      darkItemSelectedBg: '#394b4a',
      darkItemSelectedColor: '#4efec9',
      darkItemHoverBg: '#38393d',
      itemHeight: 45,
      darkSubMenuItemBg: '#090b0e',
      itemBorderRadius: 8,
    },
    Table: {
      colorBgContainer: '#FEFEFE',
    },
    Radio: {
      borderRadius: 10,
    },
  },
};

export default antdTheme;
