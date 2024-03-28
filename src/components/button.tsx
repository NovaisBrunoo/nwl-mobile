import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type buttonProps = TouchableOpacityProps & {
  children: ReactNode
}

type buttonTextProps = {
  children: ReactNode
}

type buttonIconProps = {
  children: ReactNode
}


function Button({ children, ...rest }: buttonProps) {
  return (
    <TouchableOpacity className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row" activeOpacity={0.7} {...rest}>
      {children}
    </TouchableOpacity>
  )
}


function buttonText({ children }: buttonTextProps) {
  return (
    <Text className="text-black font-bold text-base mx-2">
      {children}
    </Text>
  )
}

function buttonIcon({ children }: buttonIconProps) {
  return children
}

Button.Text = buttonText
Button.Icon = buttonIcon

export { Button };

