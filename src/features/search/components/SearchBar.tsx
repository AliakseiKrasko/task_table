import { Input } from "antd";

type Props = {
    value: string;
    onChange: (val: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
    return (
        <Input
            placeholder="Поиск по таблице..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: 300 }}
        />
    );
}