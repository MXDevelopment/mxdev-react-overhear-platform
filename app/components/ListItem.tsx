import React, { ReactElement } from "react"
import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"
import { colors, spacing, typography } from "../theme"
import { Icon, IconTypes } from "./Icon"
import { Text, TextProps } from "./Text"

export interface ListItemProps extends TouchableOpacityProps {
  /**
   * How tall the list item should be.
   * Default: 56
   */
  height?: number
  /**
   * Whether to show the top separator.
   * Default: false
   */
  topSeparator?: boolean
  /**
   * Whether to show the bottom separator.
   * Default: false
   */
  bottomSeparator?: boolean
  /**
   * Text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * Children components.
   */
  children?: TextProps["children"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * Optional text style override.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the Text component.
   */
  TextProps?: TextProps
  /**
   * Optional View container style override.
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Optional TouchableOpacity style override.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Icon that should appear on the left.
   */
  leftIcon?: IconTypes
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string
  /**
   * Icon that should appear on the right.
   */
  rightIcon?: IconTypes
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string
  /**
   * Right action custom ReactElement.
   * Overrides `rightIcon`.
   */
  RightComponent?: ReactElement
  /**
   * Left action custom ReactElement.
   * Overrides `leftIcon`.
   */
  LeftComponent?: ReactElement
  title?: string
  author?: string 
  description?: string
  pinIcon?: string
  bio?: string
  website?: string
  authorImage?: Image
  chevron?: IconTypes
}

interface ListItemActionProps {
  icon?: IconTypes
  iconColor?: string
  Component?: ReactElement
  size: number
  side: "left" | "right"
}

/**
 * A styled row component that can be used in FlatList, SectionList, or by itself.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-ListItem.md)
 */
export function ListItem(props: ListItemProps) {
  const [isExpanded, setExpanded] = React.useState(false);
  const {
    bottomSeparator,
    children,
    height = 56,
    LeftComponent,
    leftIcon,
    leftIconColor,
    RightComponent,
    rightIcon,
    rightIconColor,
    style,
    text,
    TextProps,
    topSeparator,
    tx,
    txOptions,
    textStyle: $textStyleOverride,
    containerStyle: $containerStyleOverride,
    title,
    author,
    description,
    pinIcon,
    bio,
    website,
    authorImage,
    chevron,
    ...TouchableOpacityProps
  } = props
  const handlePress = () => {
    setExpanded(!isExpanded);
  };
  const $textStyles = [$textStyle, $textStyleOverride, TextProps?.style]

  const $containerStyles = [
    topSeparator && $separatorTop,
    bottomSeparator && $separatorBottom,
    $containerStyleOverride,
  ]

  const $touchableStyles = [$touchableStyle, { minHeight: height }, style]

  return (
    <View style={isExpanded ? $itemExpanded : $libraryItem}>
      <View style={$row}>
        <ListItemAction
          side="left"
          size={height}
          icon={leftIcon}
          iconColor={leftIconColor}
          Component={LeftComponent}
        />

        {/* Pin Icon */}
        {pinIcon && <Image source={{ uri: pinIcon }} style={$pinIconStyle} />}
                
        {/* Title and Author */}
        <View style={$stackedTextStyle}>
          {title && <Text style={$titleStyle}>{title}</Text>}
          {author && <Text style={$authorStyle}>{author}</Text>}
        </View>
      
        <Icon 
          icon="chevron"
          size={height}
          onPress={handlePress}
          style={isExpanded ? $rotated : {}}
        />

        <ListItemAction
          side="right"
          size={height}
          icon={rightIcon}
          iconColor={rightIconColor}
          Component={RightComponent}
        />
    </View>

      {isExpanded && (
        <View style={$expanded}>
          {bio && <Text style={$titleStyle}>{bio}</Text>}
          {description && <Text style={$titleStyle}>{description}</Text>}
          {website && <Text style={$titleStyle}>{website}</Text>}
        </View>
      )}
    </View>
  );
}


function ListItemAction(props: ListItemActionProps) {
  const { icon, Component, iconColor, size, side } = props

  const $iconContainerStyles = [$iconContainer]

  if (Component) return Component

  if (icon !== undefined) {
    return (
      <Icon
        size={24}
        icon={icon}
        color={iconColor}
        containerStyle={[
          $iconContainerStyles,
          side === "left" && $iconContainerLeft,
          side === "right" && $iconContainerRight,
          { height: size },
        ]}
      />
    )
  }

  return null
}

const $separatorTop: ViewStyle = {
  borderTopWidth: 1,
  borderTopColor: colors.separator,
}

const $separatorBottom: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
}

const $textStyle: TextStyle = {
  paddingVertical: spacing.xs,
  alignSelf: "center",
  flexGrow: 1,
  flexShrink: 1,
}

const $touchableStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
}

const $iconContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 0,
}
const $iconContainerLeft: ViewStyle = {
  marginEnd: spacing.md,
}

const $iconContainerRight: ViewStyle = {
  marginStart: spacing.md,
}
const $pinIconStyle: ImageStyle = {
  width: 42,
  height: 59,
};

const $logoContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const $titleStyle: TextStyle = {
  fontSize: 16,
  fontWeight: "500",
  fontFamily: typography.custom.normal,
  color: "#000",
};

const $authorStyle: TextStyle = {
  fontSize: 14,
  fontWeight: "300",
  fontFamily: typography.custom.normal,
  color: "#000",
};

const $stackedTextStyle: ViewStyle = {
  flex: 3,
  justifyContent: 'center',
  paddingHorizontal: 8,
};

const $chevronStrokeIcon: ImageStyle = {
  width: 52,
  height: 10,
};

const $chevronContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const $playpauseContainerChild: ImageStyle = {
  width: 31,
  height: 36,
};

const $playpauseContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const $expanded: ViewStyle = {
  padding: 8,
};

const $description: TextStyle = {
  fontSize: 14,
  fontWeight: "500",
  fontFamily: typography.custom.normal,
  color: "#000",
};

const $descriptionText: TextStyle = {
  fontSize: 14,
  fontWeight: "300",
  fontFamily: typography.custom.normal,
  color: "#000",
};

const $libraryItem: ViewStyle = {
  flex: 1,
  justifyContent: 'flex-start',
  backgroundColor: "#2f5ca6",
  flexDirection: 'row',
  alignItems: 'center',
  padding: 8,
};

const $itemExpanded: ViewStyle = {
  flex: 1,
  justifyContent: 'flex-start',
  backgroundColor: "#2f5ca6",
};

const $row: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 8,
};

const $rotated: ImageStyle = {
  transform: [{ rotate: '180deg' }],
};
