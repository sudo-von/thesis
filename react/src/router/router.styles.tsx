const routerStyles = (colors:ReactNativePaper.ThemeColors) => ({
  drawerStyle: {
    backgroundColor: colors.background,
  },
  drawerActiveBackgroundColor: '#f2f2f2',
  drawerActiveTintColor: colors.primary,
  drawerInactiveTintColor: colors.accent,
  headerTintColor: colors.background,
  headerStyle: {
    backgroundColor: colors.primary,
  },
} as const);

export default routerStyles;
