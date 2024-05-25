import { Registro } from "@/modules/firebase/models/Registro";
import DashboardWidget from "./DashboardWidget";
import { Box, FormControl, InputLabel, MenuItem, Select, Table, TableCell, TableRow } from "@mui/material";
import { getEventHourlyHeatmap } from "./utils";
import React from "react";

const dow = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const hours = Array.from({ length: 24 }, (x, i) => i);

const getColor = (value: number, scaleMin: number, scaleMax: number) => {
    const percent = value == scaleMin && value == scaleMax ? 1 : (value - scaleMin) / (scaleMax - scaleMin);
    const color = value == 0 ? 100 : 90 - 70 * percent;
    return `hsl(270, 100%, ${color}%)`;
};

export default function FrequenciaHorarioChart({ data }: { data: Registro[] }) {
    const chartData = getEventHourlyHeatmap(data);
    const [selectedEvent, setSelectedEvent] = React.useState<string>(Object.keys(chartData)[0]);

    const { eventData, scaleMin, scaleMax } = chartData[selectedEvent];

    return (
        <DashboardWidget title="Frequência por horário">

            <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ mb: 2 }}>
                <FormControl size="small" variant="standard" sx={{ minWidth: 300 }}>
                    <InputLabel id="evento-label">Evento</InputLabel>
                    <Select
                        labelId="evento-label"
                        value={selectedEvent}
                        label="Evento"

                        onChange={(e) => setSelectedEvent(e.target.value)}
                    >
                        {Object.keys(chartData).map((event: string, idx: number) => <MenuItem key={event} value={event}>{event}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Table border={0} sx={{ p: 0 }}>
                    <TableRow>
                        <TableCell size="small" sx={{ px: 0, borderRight: 1, borderRightColor: '#dfdfdf', textAlign: 'center' }}></TableCell>
                        {hours.map((hour, idx) => (
                            <TableCell key={hour} size="small" sx={{ px: 0, borderRight: 1, borderRightColor: '#dfdfdf', textAlign: 'center' }}>
                                {`0${hour}`.slice(-2)}h
                            </TableCell>
                        ))}
                    </TableRow>

                    {dow.map((day, dayIdx) => (
                        <TableRow key={day}>
                            <TableCell size="small" sx={{ px: 0, borderRight: 1, borderRightColor: '#dfdfdf' }}>{day}</TableCell>
                            {hours.map((hour) => (
                                <TableCell
                                    key={hour}
                                    size="small"
                                    sx={{
                                        px: 0,
                                        backgroundColor: getColor(eventData[dayIdx][hour] ?? 0, scaleMin!, scaleMax!),
                                        borderRight: 1,
                                        borderRightColor: '#dfdfdf'
                                    }} />
                            )
                            )}
                        </TableRow>
                    ))}
                </Table>
            </Box>

            <Box>
                <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ mt: 2 }}>
                    <Box sx={{ mr: 1, textAlign: 'right' }}>Escala: {scaleMin}</Box>
                    <Box sx={{ width: '50%', height: 15, background: `linear-gradient(to right, ${getColor(scaleMin!, scaleMin!, scaleMax!)}, ${getColor(scaleMax!, scaleMin!, scaleMax!)})` }} />
                    <Box sx={{ ml: 1 }}>{scaleMax}</Box>
                </Box>
            </Box>
        </DashboardWidget>
    )
}