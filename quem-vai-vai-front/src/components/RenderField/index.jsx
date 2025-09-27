import {
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox
} from "@mui/material"
import dayjs from "dayjs"

const RenderField = (props) => {
    const { field, value, onChange } = props

    switch (field.type) {
        case "select":
            return (
                <FormControl fullWidth required={field.required}>
                    {field.label && <InputLabel>{field.label}</InputLabel>}
                    <Select
                        label={field.label}
                        value={value}
                        onChange={(e) => onChange(field.name, e.target.value)}
                    >
                        {field.options?.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )

        case "radio":
            return (
                <FormControl component="fieldset" fullWidth required={field.required}>
                    {field.label && <Typography variant="body2" gutterBottom>{field.label}</Typography>}
                    <RadioGroup
                        row
                        value={value}
                        onChange={(e) => onChange(field.name, e.target.value)}
                    >
                        {field.options?.map((opt) => (
                            <FormControlLabel
                                key={opt.value}
                                value={opt.value}
                                control={<Radio />}
                                label={opt.label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            )

        case "checkbox":
            return (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!!value}
                            onChange={(e) => onChange(field.name, e.target.checked)}
                        />
                    }
                    label={field.label}
                    required={field.required}
                />
            )

        case "date":
            return (
                <TextField
                    label={field.label}
                    type="datetime-local"
                    value={value ? dayjs(value).format("YYYY-MM-DDTHH:mm") : ""}
                    onChange={(e) => onChange(field.name, new Date(e.target.value).toISOString())}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required={field.required}
                />
            )

        default: // text, email, number etc.
            return (
                <TextField
                    required={field.required}
                    label={field.label}
                    type={field.type || "text"}
                    value={value}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    fullWidth
                />
            )
    }
}

export default RenderField