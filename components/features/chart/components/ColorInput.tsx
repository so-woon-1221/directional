import { HexAlphaColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ColorInput = ({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="w-4 h-4" style={{ backgroundColor: color }} />
      </PopoverTrigger>
      <PopoverContent>
        <HexAlphaColorPicker
          color={color}
          onChange={(color) => {
            onChange(color);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ColorInput;
