import { clsx } from "clsx";
import { Pressable, PressableProps, Text } from "react-native";

type CategoryButtonProps = PressableProps & {
    title: string,
    isSelected?: boolean
}

export function CategoryButton({ title, isSelected, ...rest }: CategoryButtonProps) {
    return (
        <Pressable
            className={clsx("bg-slate-800 justify-center px-4 h-10 rounded-md ", isSelected && 'border-2 border-lime-300')}
            {...rest}
        >
            <Text className="text-white font-bold">{title}</Text>
        </Pressable>

    );
}